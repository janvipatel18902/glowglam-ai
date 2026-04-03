'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { Container } from '@/components/layout/container/Container';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { getAccessToken } from '@/lib/auth';
import { getSkinTestById } from '@/lib/skin-test-api';

type SkinTestDetail = {
  id: string;
  status: string;
  summary: string | null;
  createdAt: string;
  resultJson?: {
    skincare?: {
      skinType?: string;
      sensitivity?: string;
      confidence?: number;
      concerns?: string[];
    };
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

export default function SkinTestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : '';

  const [result, setResult] = useState<SkinTestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        setError('');

        const token = getAccessToken();

        if (!token) {
          setError('You must be logged in to view this skin test.');
          return;
        }

        if (!id) {
          setError('Skin test ID is missing.');
          return;
        }

        const data = await getSkinTestById(id, token);
        setResult(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load skin test',
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen text-slate-800">
        <Navbar />

        <main className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8edf3_0%,#f1ebf8_48%,#edf2fb_100%)]" />

          <Container className="relative py-16 sm:py-20">
            {loading ? (
              <p className="text-center text-slate-500">Loading analysis...</p>
            ) : error ? (
              <div className="mx-auto max-w-2xl rounded-3xl border border-red-100 bg-white/85 p-8 text-center shadow-xl backdrop-blur-xl">
                <p className="text-base font-medium text-red-500">{error}</p>
              </div>
            ) : result ? (
              <div className="mx-auto max-w-4xl rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl backdrop-blur-xl sm:p-8">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-pink-500">
                    Analysis Details
                  </p>
                  <h1 className="mt-3 text-3xl font-bold text-slate-800">
                    Skin Test Report
                  </h1>
                  <p className="mt-4 text-slate-500">
                    {result.summary || 'Analysis completed successfully.'}
                  </p>
                </div>

                <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50/80 p-4 text-left">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-violet-700">
                        ✨ AI chat can use this skin test
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Open AI chat to ask follow-up questions based on this result.
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

                {result.images?.[0]?.imageUrl ? (
                  <img
                    src={result.images[0].imageUrl}
                    alt="Skin test"
                    className="mx-auto mt-8 h-72 w-full max-w-sm rounded-2xl object-cover shadow-md"
                  />
                ) : null}

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
                      {result.resultJson?.skincare?.confidence
                        ? `${Math.round(
                          result.resultJson.skincare.confidence * 100,
                        )}%`
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
              </div>
            ) : null}
          </Container>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}