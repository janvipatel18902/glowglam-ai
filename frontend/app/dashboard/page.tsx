import { DashboardQuickActions } from '@/components/dashboard/DashboardQuickActions';
import { DashboardRecentActivity } from '@/components/dashboard/DashboardRecentActivity';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-pink-500/10 backdrop-blur-xl sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                            Welcome Back
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                            Your Glow Dashboard
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                            Track your skin analysis, explore products, review AI beauty
                            conversations, and continue your personalized skincare journey.
                        </p>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 px-5 py-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            Today’s Focus
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">
                            Hydration + Barrier Repair
                        </p>
                    </div>
                </div>
            </section>

            <DashboardStats />
            <DashboardQuickActions />
            <DashboardRecentActivity />
        </div>
    );
}