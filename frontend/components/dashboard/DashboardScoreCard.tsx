'use client';

import { useLatestSkinTest } from './useLatestSkinTest';

function CircularScore({ value }: { value: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div className="relative flex items-center justify-center">
      <svg
        className="h-40 w-40 -rotate-90 sm:h-48 sm:w-48"
        viewBox="0 0 140 140"
      >
        <defs>
          <linearGradient
            id="dashboard-score-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>

        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#efe9f2"
          strokeWidth="8"
        />

        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#dashboard-score-gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-4xl font-bold leading-none text-fuchsia-600">
          {value}
        </div>
        <div className="mt-1 text-xs text-slate-400">out of 100</div>
      </div>
    </div>
  );
}

export function DashboardScoreCard() {
  const { latest } = useLatestSkinTest();

  const skincare = latest?.resultJson?.skincare;
  const hasAnalysis = Boolean(skincare);
  const score =
    typeof skincare?.confidence === 'number'
      ? Math.round(skincare.confidence * 100)
      : null;

  return (
    <div className="rounded-[1.75rem] border border-[#f0e7f3] bg-white p-5 shadow-[0_10px_30px_rgba(236,72,153,0.08)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Skin Health Score
          </h2>
        </div>

        <div className="text-lg text-emerald-500">↗</div>
      </div>

      {hasAnalysis && score !== null ? (
        <div className="mt-6 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-1 justify-center">
            <CircularScore value={score} />
          </div>

          <div className="w-full max-w-[220px] md:pb-2">
            <p className="text-xs text-slate-400">Latest Analysis</p>
            <p className="mt-1 text-3xl font-bold capitalize text-emerald-500">
              {skincare?.skinType || 'Available'}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              Your score is based on your most recent AI skin analysis.
            </p>

            <div className="mt-8 flex justify-end">
              <div className="h-1.5 w-16 rounded-full bg-slate-900" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-[1.5rem] border border-[#f3e8f6] bg-[#fcf8fc] p-5">
          <p className="text-base font-semibold text-slate-800">
            No skin health score yet
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Complete your first skin test to generate your AI skin score and
            latest skin type summary.
          </p>
        </div>
      )}
    </div>
  );
}