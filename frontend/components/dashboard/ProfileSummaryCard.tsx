export function ProfileSummaryCard() {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-pink-500/10 backdrop-blur-xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/30 to-violet-500/30 text-2xl font-bold text-white">
                    JP
                </div>

                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                        Profile Overview
                    </p>
                    <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                        Janvi Patel
                    </h1>
                    <p className="mt-2 text-sm text-slate-300">
                        Personalized skincare dashboard and beauty profile.
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Skin Type
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                        Combination
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Main Concern
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                        Oily Skin
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        Glow Score
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                        86%
                    </p>
                </div>
            </div>
        </div>
    );
}