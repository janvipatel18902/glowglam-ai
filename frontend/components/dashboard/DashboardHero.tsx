'use client';

import { Sparkles } from 'lucide-react';
import { getAuthUser } from '@/lib/auth';
import { useLatestSkinTest } from './useLatestSkinTest';

function formatLabel(value?: string | null) {
  if (!value) return '';

  return value
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function DashboardHero() {
  const { latest } = useLatestSkinTest();
  const user = getAuthUser();

  const rawFirstName =
    user?.fullName?.trim()?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    'User';

  const firstName = rawFirstName
    ? rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1)
    : 'User';

  const greeting = getGreeting();

  return (
    <section className="rounded-[2rem] bg-[#f7eef7] px-5 py-6 sm:px-7 sm:py-7">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
        <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" />
        Your Personalized Dashboard
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-fuchsia-600 sm:text-5xl">
        {greeting}, {firstName}!
      </h1>

      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        {latest?.summary ||
          'Start your skincare journey by taking your first skin test.'}
      </p>

      {latest?.resultJson?.skincare ? (
        <div className="mt-4 flex flex-wrap gap-3">
          {latest.resultJson.skincare.skinType ? (
            <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
              Skin Type: {formatLabel(latest.resultJson.skincare.skinType)}
            </span>
          ) : null}

          {latest.resultJson.skincare.sensitivity ? (
            <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
              Sensitivity: {formatLabel(latest.resultJson.skincare.sensitivity)}
            </span>
          ) : null}

          {latest.resultJson.skincare.concerns?.map((concern) => (
            <span
              key={concern}
              className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
            >
              {formatLabel(concern)}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.5rem] border border-white/70 bg-white/80 p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-700">
            No skin analysis yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Upload a selfie and complete your first AI skin test to unlock
            personalized insights.
          </p>
        </div>
      )}
    </section>
  );
}