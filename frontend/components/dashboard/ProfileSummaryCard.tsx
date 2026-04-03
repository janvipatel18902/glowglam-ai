'use client';

import { getAuthUser } from '@/lib/auth';
import { useLatestSkinTest } from './useLatestSkinTest';

export function ProfileSummaryCard() {
  const user = getAuthUser();
  const { latest } = useLatestSkinTest();

  const fullName =
    user?.fullName?.trim() || user?.email?.split('@')[0] || 'User';

  const initials = fullName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const skinType = latest?.resultJson?.skincare?.skinType || 'Not available yet';
  const mainConcern =
    latest?.resultJson?.skincare?.concerns?.[0]?.replaceAll('_', ' ') ||
    'No skin test yet';
  const glowScore = latest?.resultJson?.skincare?.confidence
    ? `${Math.round(latest.resultJson.skincare.confidence * 100)}%`
    : 'Not available';

  return (
    <div className="rounded-[2rem] border border-[#eadff0] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-violet-500/20 text-3xl font-bold text-fuchsia-600">
          {initials || 'U'}
        </div>

        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
            Profile Overview
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
            {fullName}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Personalized skincare dashboard and beauty profile.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Skin Type
          </p>
          <p className="mt-3 text-base font-semibold text-slate-800">
            {skinType}
          </p>
        </div>

        <div className="rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Main Concern
          </p>
          <p className="mt-3 text-base font-semibold capitalize text-slate-800">
            {mainConcern}
          </p>
        </div>

        <div className="rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
            Glow Score
          </p>
          <p className="mt-3 text-base font-semibold text-slate-800">
            {glowScore}
          </p>
        </div>
      </div>
    </div>
  );
}