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
                    <linearGradient id="dashboard-score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
    return (
        <div className="rounded-[1.75rem] border border-[#f0e7f3] bg-white p-5 shadow-[0_10px_30px_rgba(236,72,153,0.08)] sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-800">Skin Health Score</h2>
                </div>

                <div className="text-lg text-emerald-500">↗</div>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
                <div className="flex flex-1 justify-center">
                    <CircularScore value={78} />
                </div>

                <div className="w-full max-w-[180px] md:pb-2">
                    <p className="text-xs text-slate-400">Weekly Progress</p>
                    <p className="mt-1 text-3xl font-bold text-emerald-500">+5 points</p>

                    <div className="mt-8 flex justify-end">
                        <div className="h-1.5 w-16 rounded-full bg-slate-900" />
                    </div>
                </div>
            </div>
        </div>
    );
}