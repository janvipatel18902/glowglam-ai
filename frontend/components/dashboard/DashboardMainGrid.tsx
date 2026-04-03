'use client';

import { useLatestSkinTest } from './useLatestSkinTest';
import { DashboardMetricsCard } from '../dashboard/DashboardMetricsCard';
import { DashboardRoutineCard } from '../dashboard/DashboardRoutineCard';
import { DashboardScoreCard } from '../dashboard/DashboardScoreCard';
import { DashboardUpdateRoutineCard } from '../dashboard/DashboardUpdateRoutineCard';

const starterMorningRoutine = [
  {
    step: '1',
    title: 'Cleanser',
    subtitle: 'Start with a gentle cleanser',
    time: '1 min',
  },
  {
    step: '2',
    title: 'Moisturizer',
    subtitle: 'Apply a lightweight daily moisturizer',
    time: '1 min',
  },
  {
    step: '3',
    title: 'SPF',
    subtitle: 'Finish with sunscreen for daytime protection',
    time: '1 min',
  },
];

const starterEveningRoutine = [
  {
    step: '1',
    title: 'Cleanser',
    subtitle: 'Wash away dirt, oil, and makeup',
    time: '1 min',
  },
  {
    step: '2',
    title: 'Moisturizer',
    subtitle: 'Hydrate and support your skin barrier',
    time: '1 min',
  },
];

const analysisMorningRoutine = [
  {
    step: '1',
    title: 'Cleanser',
    subtitle: 'Gentle Face Wash',
    time: '1 min',
  },
  {
    step: '2',
    title: 'Toner',
    subtitle: 'Hydrating Toner',
    time: '30 sec',
  },
  {
    step: '3',
    title: 'Serum',
    subtitle: 'Vitamin C Serum',
    time: '2 min',
  },
  {
    step: '4',
    title: 'Moisturizer',
    subtitle: 'Day Cream SPF 30',
    time: '1 min',
  },
];

const analysisEveningRoutine = [
  {
    step: '1',
    title: 'Cleanser',
    subtitle: 'Gentle Face Wash',
    time: '2 min',
  },
  {
    step: '2',
    title: 'Treatment',
    subtitle: 'Skin-targeted treatment step',
    time: '1 min',
  },
  {
    step: '3',
    title: 'Serum',
    subtitle: 'Repair and hydration serum',
    time: '2 min',
  },
  {
    step: '4',
    title: 'Moisturizer',
    subtitle: 'Night Cream',
    time: '1 min',
  },
];

export function DashboardMainGrid() {
  const { latest } = useLatestSkinTest();
  const hasAnalysis = Boolean(latest?.resultJson?.skincare);

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_340px]">
      <div className="min-w-0 space-y-6">
        <DashboardScoreCard />
        <DashboardMetricsCard />
      </div>

      <div className="min-w-0 space-y-6">
        <DashboardRoutineCard
          title="Morning Routine"
          icon="☀️"
          items={hasAnalysis ? analysisMorningRoutine : starterMorningRoutine}
          emptyState={!hasAnalysis}
        />
        <DashboardRoutineCard
          title="Evening Routine"
          icon="🌙"
          items={hasAnalysis ? analysisEveningRoutine : starterEveningRoutine}
          emptyState={!hasAnalysis}
        />
        <DashboardUpdateRoutineCard hasAnalysis={hasAnalysis} />
      </div>
    </section>
  );
}