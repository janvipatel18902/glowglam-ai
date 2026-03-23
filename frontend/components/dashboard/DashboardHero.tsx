import { Sparkles } from 'lucide-react';

export function DashboardHero() {
    return (
        <section className="rounded-[2rem] bg-[#f7eef7] px-5 py-6 sm:px-7 sm:py-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" />
                Your Personalized Dashboard
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-fuchsia-600 sm:text-5xl">
                Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Let&apos;s continue your skincare journey
            </p>
        </section>
    );
}