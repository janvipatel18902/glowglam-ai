'use client';

import { useLatestSkinTest } from './useLatestSkinTest';

export function DashboardMetricsCard() {
  const { latest } = useLatestSkinTest();

  const skincare = latest?.resultJson?.skincare;
  const hasAnalysis = Boolean(skincare);

  if (!hasAnalysis) {
    return (
      <div className="rounded-[1.75rem] border border-[#f0e7f3] bg-white p-5 shadow-[0_10px_30px_rgba(236,72,153,0.08)] sm:p-6">
        <h2 className="text-2xl font-semibold text-slate-800">Skin Metrics</h2>

        <div className="mt-6 rounded-[1.5rem] border border-[#f3e8f6] bg-[#fcf8fc] p-5">
          <p className="text-base font-semibold text-slate-800">
            No skin metrics available yet
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Once you complete a skin test, hydration, barrier, clarity, and
            routine match insights will appear here.
          </p>
        </div>
      </div>
    );
  }

  const concernCount = skincare?.concerns?.length || 0;
  const recommendationCount = latest?.recommendations?.length || 0;

  const skinType = skincare?.skinType?.toLowerCase() || '';
  const sensitivity = skincare?.sensitivity?.toLowerCase() || '';

  const hydration =
    skinType === 'dry'
      ? 55
      : skinType === 'combination'
        ? 72
        : skinType === 'oily'
          ? 68
          : 75;

  const barrier =
    sensitivity === 'high'
      ? 58
      : sensitivity === 'medium'
        ? 72
        : sensitivity === 'low'
          ? 85
          : 70;

  const clarity =
    concernCount >= 3
      ? 58
      : concernCount === 2
        ? 70
        : concernCount === 1
          ? 82
          : 90;

  const routine =
    recommendationCount > 0 ? Math.min(100, 60 + recommendationCount * 8) : 60;

  const metrics = [
    {
      label: 'Hydration',
      value: `${hydration}%`,
      dotClassName: 'bg-blue-500',
      width: `${hydration}%`,
    },
    {
      label: 'Barrier',
      value: `${barrier}%`,
      dotClassName: 'bg-yellow-400',
      width: `${barrier}%`,
    },
    {
      label: 'Clarity',
      value: `${clarity}%`,
      dotClassName: 'bg-pink-500',
      width: `${clarity}%`,
    },
    {
      label: 'Routine Match',
      value: `${routine}%`,
      dotClassName: 'bg-violet-500',
      width: `${routine}%`,
    },
  ];

  return (
    <div className="rounded-[1.75rem] border border-[#f0e7f3] bg-white p-5 shadow-[0_10px_30px_rgba(236,72,153,0.08)] sm:p-6">
      <h2 className="text-2xl font-semibold text-slate-800">Skin Metrics</h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`h-5 w-5 rounded-full ${metric.dotClassName} flex-shrink-0`}
                />
                <p className="text-sm text-slate-500">{metric.label}</p>
              </div>

              <p className="text-3xl font-bold leading-none text-slate-900">
                {metric.value}
              </p>
            </div>

            <div className="mt-4 h-1.5 w-full rounded-full bg-slate-200">
              <div
                className="h-1.5 rounded-full bg-slate-900"
                style={{ width: metric.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}