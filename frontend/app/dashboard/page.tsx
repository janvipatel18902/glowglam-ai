import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { DashboardMainGrid } from '@/components/dashboard/DashboardMainGrid';
import { MotionFade } from '@/components/ui/MotionFade';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <MotionFade>
                <DashboardHero />
            </MotionFade>

            <MotionFade delay={0.08}>
                <DashboardMainGrid />
            </MotionFade>
        </div>
    );
}