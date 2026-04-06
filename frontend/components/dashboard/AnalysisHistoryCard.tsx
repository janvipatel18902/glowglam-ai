'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteSkinTest, getMySkinTests } from '@/lib/skin-test-api';

type SkinTestItem = {
  id: string;
  status: string;
  summary: string | null;
  createdAt: string;
  resultJson?: {
    skincare?: {
      skinType?: string;
      concerns?: string[];
      sensitivity?: string;
      confidence?: number;
    };
  } | null;
  images?: Array<{
    imageUrl: string;
  }>;
};

export function AnalysisHistoryCard() {
  const [analyses, setAnalyses] = useState<SkinTestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    async function fetchAnalyses() {
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          setError('Please login first.');
          setLoading(false);
          return;
        }

        const data = await getMySkinTests(token);
        setAnalyses(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load history');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyses();
  }, []);

  async function handleDelete(id: string) {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setError('Please login first.');
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to delete this skin test?',
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteSkinTest(id, token);
      setAnalyses((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete scan');
    } finally {
      setDeletingId('');
    }
  }

  return (
    <div className="rounded-[2rem] border border-[#eadff0] bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-400">
          Skin Analysis History
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-800">
          Recent Scans
        </h2>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-slate-500">
          Loading skin analysis history...
        </p>
      ) : error ? (
        <p className="mt-6 text-sm text-red-500">{error}</p>
      ) : analyses.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4">
          <p className="text-sm font-medium text-slate-700">
            No skin tests found yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Once you complete your first skin analysis, it will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(236,72,153,0.08)]"
            >
              <div className="flex gap-4">
                {analysis.images?.[0]?.imageUrl ? (
                  <img
                    src={analysis.images[0].imageUrl}
                    alt="Skin test"
                    className="h-20 w-20 flex-shrink-0 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border border-[#eee6f1] bg-white text-xs text-slate-400">
                    No Image
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {new Date(analysis.createdAt).toLocaleDateString()}
                      </p>

                      <p className="mt-2 text-base font-semibold capitalize text-slate-800">
                        {analysis.resultJson?.skincare?.skinType ||
                          'Skin Analysis'}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {analysis.summary || 'No summary available'}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${analysis.status === 'completed'
                          ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border border-amber-200 bg-amber-50 text-amber-700'
                        }`}
                    >
                      {analysis.status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {analysis.resultJson?.skincare?.concerns?.map((concern) => (
                      <span
                        key={concern}
                        className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs text-pink-700"
                      >
                        {concern.replaceAll('_', ' ')}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/skin-test/${analysis.id}`}
                      className="rounded-full border border-[#eadff0] bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#faf7fb]"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(analysis.id)}
                      disabled={deletingId === analysis.id}
                      className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                    >
                      {deletingId === analysis.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}