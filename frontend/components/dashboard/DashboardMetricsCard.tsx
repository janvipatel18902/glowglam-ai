const metrics = [
    {
        label: 'Hydration',
        value: '82%',
        dotClassName: 'bg-blue-500',
        width: '82%',
    },
    {
        label: 'Brightness',
        value: '75%',
        dotClassName: 'bg-yellow-400',
        width: '75%',
    },
    {
        label: 'Texture',
        value: '70%',
        dotClassName: 'bg-pink-500',
        width: '70%',
    },
    {
        label: 'Clarity',
        value: '85%',
        dotClassName: 'bg-violet-500',
        width: '85%',
    },
];

export function DashboardMetricsCard() {
    return (
        <div className="rounded-[1.75rem] border border-[#f0e7f3] bg-white p-5 shadow-[0_10px_30px_rgba(236,72,153,0.08)] sm:p-6">
            <h2 className="text-2xl font-semibold text-slate-800">Skin Metrics</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {metrics.map((metric) => (
                    <div key={metric.label}>
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span
                                    className={`h-5 w-5 rounded-full ${metric.dotClassName} flex-shrink-0`}
                                />
                                <p className="text-sm text-slate-500">{metric.label}</p>
                            </div>

                            <p className="text-3xl font-bold leading-none text-slate-900">
                                {metric.value}
                            </p>
                        </div>

                        <div className="mt-4 h-1.5 w-full rounded-full bg-slate-200">
                            <div
                                className="h-1.5 rounded-full bg-slate-900"
                                style={{ width: metric.width }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}