const stats = [
    {
        label: 'Skin Analyses',
        value: '12',
        subtext: 'Completed scans',
    },
    {
        label: 'Saved Products',
        value: '18',
        subtext: 'Beauty favorites',
    },
    {
        label: 'AI Chats',
        value: '34',
        subtext: 'Conversation sessions',
    },
    {
        label: 'Glow Score',
        value: '86%',
        subtext: 'Latest skin score',
    },
];

export function DashboardStats() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-pink-500/5 backdrop-blur-xl"
                >
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate-300">{stat.subtext}</p>
                </div>
            ))}
        </div>
    );
}