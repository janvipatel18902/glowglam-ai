'use client';

import { getAuthUser } from '@/lib/auth';
import { useLatestSkinTest } from './useLatestSkinTest';

export function ProfileDetailsCard() {
  const user = getAuthUser();
  const { latest } = useLatestSkinTest();

  const createdAt = user ? new Date().toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  }) : 'Not available';

  const skinType = latest?.resultJson?.skincare?.skinType || 'Not available yet';
  const sensitivity =
    latest?.resultJson?.skincare?.sensitivity || 'Not available yet';

  const sections = [
    {
      title: 'Account Details',
      items: [
        { label: 'Email', value: user?.email || 'Not available' },
        { label: 'Member Since', value: createdAt },
        { label: 'Plan', value: 'Free' },
      ],
    },
    {
      title: 'Beauty Preferences',
      items: [
        {
          label: 'Routine Focus',
          value: latest ? 'Based on your latest skin analysis' : 'Complete a skin test first',
        },
        { label: 'Sensitive Skin', value: sensitivity },
        { label: 'Skin Type', value: skinType },
      ],
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-[2rem] border border-[#eadff0] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6"
        >
          <h2 className="text-2xl font-semibold text-slate-800">
            {section.title}
          </h2>

          <div className="mt-5 space-y-4">
            {section.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                  {item.label}
                </p>

                <p className="mt-3 text-sm font-medium text-slate-800 sm:text-base">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}