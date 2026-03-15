const activities = [
    {
        title: 'Skin analysis completed',
        description: 'Your latest scan detected combination skin with hydration needs.',
        date: 'March 15, 2026',
    },
    {
        title: 'AI chat updated',
        description: 'You asked GlowGlam AI about dry and sensitive skin care.',
        date: 'March 14, 2026',
    },
    {
        title: 'Product saved',
        description: 'Hydrating Serum was added to your saved products.',
        date: 'March 13, 2026',
    },
];

export function DashboardRecentActivity() {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                    Recent Activity
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                    Latest updates
                </h2>
            </div>

            <div className="mt-6 space-y-4">
                {activities.map((activity) => (
                    <div
                        key={`${activity.title}-${activity.date}`}
                        className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5"
                    >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h3 className="text-base font-semibold text-white">
                                    {activity.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-300">
                                    {activity.description}
                                </p>
                            </div>

                            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                {activity.date}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}