import { DashboardMetricsCard } from '../dashboard/DashboardMetricsCard';
import { DashboardRoutineCard } from '../dashboard/DashboardRoutineCard';
import { DashboardScoreCard } from '../dashboard/DashboardScoreCard';
import { DashboardUpdateRoutineCard } from '../dashboard/DashboardUpdateRoutineCard';

const morningRoutine = [
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

const eveningRoutine = [
    {
        step: '1',
        title: 'Cleanser',
        subtitle: 'Gentle Face Wash',
        time: '2 min',
    },
    {
        step: '2',
        title: 'Exfoliant',
        subtitle: 'AHA Toner',
        time: '1 min',
    },
    {
        step: '3',
        title: 'Serum',
        subtitle: 'Retinol Serum',
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
    return (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.8fr)_340px]">
            <div className="space-y-6 min-w-0">
                <DashboardScoreCard />
                <DashboardMetricsCard />
            </div>

            <div className="space-y-6 min-w-0">
                <DashboardRoutineCard
                    title="Morning Routine"
                    icon="☀️"
                    items={morningRoutine}
                />
                <DashboardRoutineCard
                    title="Evening Routine"
                    icon="🌙"
                    items={eveningRoutine}
                />
                <DashboardUpdateRoutineCard />
            </div>
        </section>
    );
}