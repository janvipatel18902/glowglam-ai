'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';
import {
  analyzeSkinTest,
  createSkinTest,
  uploadSkinTestImage,
} from '@/lib/skin-test-api';

type AnalyzeResult = {
  id: string;
  status: string;
  summary: string | null;
  resultJson?: {
    skincare?: {
      skinType?: string;
      sensitivity?: string;
      concerns?: string[];
      confidence?: number;
    };
    rawLabels?: Array<{
      label: string;
      score: number;
    }>;
  } | null;
  recommendations?: Array<{
    id?: string;
    title: string;
    description: string;
  }>;
  images?: Array<{
    imageUrl: string;
  }>;
};

function dataUrlToFile(dataUrl: string, fileName: string) {
  const arr = dataUrl.split(',');
  const mimeMatch = arr[0]?.match(/:(.*?);/);
  const mime = mimeMatch?.[1] || 'image/png';
  const bstr = atob(arr[1] || '');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}

function formatLabel(value?: string | null) {
  if (!value) return 'N/A';

  return value
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export default function SkinTestPage() {
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stepLabel, setStepLabel] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      router.replace('/login');
      return;
    }

    setImage(null);
    setSelectedFile(null);
    setResult(null);
    setHasAnalyzed(false);
    setCheckingAuth(false);
  }, [router]);

  useEffect(() => {
    return () => {
      if (image?.startsWith('blob:')) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setSelectedFile(file);
    setImage(url);
    setResult(null);
    setHasAnalyzed(false);
    setError('');
    closeCamera();
  }

  async function attachStreamToVideo(stream: MediaStream) {
    const video = videoRef.current;

    if (!video) {
      throw new Error('Camera preview element not available.');
    }

    video.srcObject = stream;

    await new Promise<void>((resolve, reject) => {
      const handleLoadedMetadata = async () => {
        try {
          await video.play();
          resolve();
        } catch {
          reject(new Error('Unable to start camera preview.'));
        }
      };

      video.onloadedmetadata = handleLoadedMetadata;
    });
  }

  async function openCamera() {
    setCameraError(null);
    setCameraReady(false);

    if (
      typeof navigator === 'undefined' ||
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setCameraError('Camera is not supported on this device/browser.');
      return;
    }

    try {
      closeCamera();

      let stream: MediaStream;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'user' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;
      setCameraOpen(true);

      await new Promise((resolve) => requestAnimationFrame(resolve));
      await attachStreamToVideo(stream);

      setCameraReady(true);
    } catch {
      closeCamera();
      setCameraError(
        'Unable to access camera. Please allow camera permission or use Upload Image.',
      );
    }
  }

  function closeCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    setCameraOpen(false);
    setCameraReady(false);
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) {
      setCameraError('Camera is not ready yet. Please wait a moment and try again.');
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    if (!context) {
      setCameraError('Unable to capture image.');
      return;
    }

    context.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL('image/png');
    const file = dataUrlToFile(dataUrl, `camera-capture-${Date.now()}.png`);

    setSelectedFile(file);
    setImage(dataUrl);
    setResult(null);
    setHasAnalyzed(false);
    setError('');
    closeCamera();
  }

  function removeImage() {
    setImage(null);
    setSelectedFile(null);
    setCameraError(null);
    setError('');
    setResult(null);
    setHasAnalyzed(false);

    if (uploadInputRef.current) {
      uploadInputRef.current.value = '';
    }
  }

  async function handleAnalyze() {
    try {
      setError('');
      setResult(null);
      setHasAnalyzed(false);
      setLoading(true);

      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.replace('/login');
        return;
      }

      if (!selectedFile) {
        throw new Error('Please upload or capture an image first.');
      }

      setStepLabel('Uploading image...');
      const uploadRes = await uploadSkinTestImage(selectedFile, token);
      const imageUrl = uploadRes.file.url;

      setStepLabel('Creating skin test...');
      const skinTestRes = await createSkinTest(imageUrl, token);
      const skinTestId = skinTestRes.id;

      setStepLabel('Running AI skin analysis...');
      const analyzeRes = await analyzeSkinTest(skinTestId, token);

      setResult(analyzeRes.skinTest);
      setHasAnalyzed(true);
      setStepLabel('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong during analysis.',
      );
      setStepLabel('');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#f8edf3_0%,#f1ebf8_48%,#edf2fb_100%)] text-slate-500">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8edf3_0%,#f1ebf8_48%,#edf2fb_100%)]" />

        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <MotionFade>
              <span className="inline-flex rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-600 shadow">
                ✧ AI Skin Analysis
              </span>
            </MotionFade>

            <MotionFade delay={0.1}>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                  Skin Analysis
                </span>
              </h1>
            </MotionFade>

            <MotionFade delay={0.15}>
              <p className="mt-4 text-slate-500">
                Upload a selfie and get instant AI skin report
              </p>
            </MotionFade>
          </div>

          <MotionFade
            delay={0.2}
            className="mx-auto mt-14 max-w-4xl rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl sm:p-8 lg:p-10"
          >
            {!image && !cameraOpen && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl">
                  Upload Your Selfie
                </h2>

                <p className="mt-3 text-sm text-slate-500 sm:text-base">
                  Clear face • good lighting • no filters
                </p>

                {cameraError && (
                  <p className="mt-4 text-sm font-medium text-red-500">
                    {cameraError}
                  </p>
                )}

                {error && (
                  <p className="mt-4 text-sm font-medium text-red-500">
                    {error}
                  </p>
                )}

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <label className="inline-block">
                    <input
                      ref={uploadInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                    />

                    <span className="inline-flex min-w-[170px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow transition hover:scale-[1.02]">
                      Upload Image
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={openCamera}
                    className="inline-flex min-w-[170px] items-center justify-center rounded-full border border-pink-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:scale-[1.02] hover:border-pink-300"
                  >
                    Click Image
                  </button>
                </div>
              </div>
            )}

            {!image && cameraOpen && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl">
                  Click Your Selfie
                </h2>

                <p className="mt-3 text-sm text-slate-500 sm:text-base">
                  Position your face clearly and capture the image
                </p>

                {cameraError && (
                  <p className="mt-4 text-sm font-medium text-red-500">
                    {cameraError}
                  </p>
                )}

                {!cameraReady ? (
                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Starting camera...
                  </p>
                ) : null}

                <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-black shadow-lg">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="mx-auto h-[260px] w-full max-w-2xl object-cover sm:h-[340px] lg:h-[420px]"
                  />
                </div>

                <canvas ref={canvasRef} className="hidden" />

                <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={closeCamera}
                    className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={capturePhoto}
                    disabled={!cameraReady}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-2.5 font-medium text-white shadow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Capture Photo
                  </button>
                </div>
              </div>
            )}

            {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt="preview"
                  className="mx-auto h-64 w-full max-w-sm rounded-2xl object-cover shadow-md sm:h-72"
                />

                {loading ? (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-slate-600">
                      {stepLabel || 'Analyzing your skin...'}
                    </p>
                  </div>
                ) : null}

                {error ? (
                  <p className="mt-4 text-sm font-medium text-red-500">
                    {error}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={removeImage}
                    className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
                    disabled={loading}
                  >
                    Remove
                  </button>

                  <label className="inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUpload}
                      className="hidden"
                      disabled={loading}
                    />

                    <span className="inline-flex cursor-pointer items-center justify-center rounded-full border border-pink-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:border-pink-300">
                      Upload Another
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setSelectedFile(null);
                      setResult(null);
                      setHasAnalyzed(false);
                      openCamera();
                    }}
                    className="rounded-full border border-pink-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:border-pink-300"
                    disabled={loading}
                  >
                    Retake Photo
                  </button>

                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-2.5 font-medium text-white shadow transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Skin'}
                  </button>
                </div>
              </div>
            )}
          </MotionFade>

          {hasAnalyzed && result ? (
            <MotionFade
              delay={0.25}
              className="mx-auto mt-10 max-w-4xl rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl sm:p-8"
            >
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.2em] text-pink-500">
                  AI Result
                </p>
                <h2 className="mt-3 text-2xl font-bold text-slate-800 sm:text-3xl">
                  Your Skin Analysis Report
                </h2>
                <p className="mt-4 text-slate-500">
                  {result.summary || 'Analysis completed successfully.'}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/80 p-4 text-left">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-violet-700">
                      ✨ AI chat now uses your latest skin test
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Ask follow-up questions and get more personalized skincare advice.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push('/ai-chat')}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:scale-[1.02]"
                  >
                    Ask AI Chat
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-pink-100 bg-pink-50/70 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Skin Type
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {formatLabel(result.resultJson?.skincare?.skinType)}
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Sensitivity
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {formatLabel(result.resultJson?.skincare?.sensitivity)}
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-100 bg-violet-50/70 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Confidence
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-800">
                    {typeof result.resultJson?.skincare?.confidence === 'number'
                      ? `${Math.round(result.resultJson.skincare.confidence * 100)}%`
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-slate-700">
                  Main Concerns
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {result.resultJson?.skincare?.concerns?.length ? (
                    result.resultJson.skincare.concerns.map((concern) => (
                      <span
                        key={concern}
                        className="rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700"
                      >
                        {formatLabel(concern)}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No concerns detected.
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm font-semibold text-slate-700">
                  Recommended Routine
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {result.recommendations?.length ? (
                    result.recommendations.map((item, index) => (
                      <div
                        key={`${item.title}-${index}`}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <h3 className="text-base font-semibold text-slate-800">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2">
                      <p className="text-sm text-slate-500">
                        No recommendations available yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </MotionFade>
          ) : null}
        </Container>
      </main>

      <Footer />
    </div>
  );
}