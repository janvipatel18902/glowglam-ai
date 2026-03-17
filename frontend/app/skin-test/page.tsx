'use client';

import { useEffect, useRef, useState } from 'react';

import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';

export default function SkinTestPage() {
    const [image, setImage] = useState<string | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);

    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        const url = URL.createObjectURL(file);
        setImage(url);
        closeCamera();
    }

    async function openCamera() {
        setCameraError(null);

        if (
            typeof navigator === 'undefined' ||
            !navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia
        ) {
            setCameraError('Camera is not supported on this device/browser.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                },
                audio: false,
            });

            streamRef.current = stream;
            setCameraOpen(true);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play().catch(() => {
                        setCameraError('Unable to start camera preview.');
                    });
                }
            }, 0);
        } catch {
            setCameraError(
                'Unable to access camera. Please allow camera permission or use Upload Image.'
            );
        }
    }

    function closeCamera() {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        setCameraOpen(false);
    }

    function capturePhoto() {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) return;

        const width = video.videoWidth;
        const height = video.videoHeight;

        if (!width || !height) {
            setCameraError('Camera is not ready yet. Please try again.');
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
        setImage(dataUrl);
        closeCamera();
    }

    function removeImage() {
        setImage(null);
        setCameraError(null);

        if (uploadInputRef.current) {
            uploadInputRef.current.value = '';
        }
    }

    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

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
                                        className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-2.5 font-medium text-white shadow transition hover:scale-[1.02]"
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

                                <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Remove
                                    </button>

                                    <label className="inline-block">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUpload}
                                            className="hidden"
                                        />

                                        <span className="inline-flex cursor-pointer items-center justify-center rounded-full border border-pink-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:border-pink-300">
                                            Upload Another
                                        </span>
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImage(null);
                                            openCamera();
                                        }}
                                        className="rounded-full border border-pink-200 bg-white px-5 py-2.5 font-medium text-slate-700 transition hover:border-pink-300"
                                    >
                                        Retake Photo
                                    </button>

                                    <button
                                        type="button"
                                        className="rounded-full bg-gradient-to-r from-pink-500 to-blue-500 px-6 py-2.5 font-medium text-white shadow transition hover:scale-[1.02]"
                                    >
                                        Analyze Skin
                                    </button>
                                </div>
                            </div>
                        )}
                    </MotionFade>
                </Container>
            </main>

            <Footer />
        </div>
    );
}