const analyses = [
    {
        date: 'March 14, 2026',
        skinType: 'Combination',
        result: 'Hydration Needed',
    },
    {
        date: 'March 10, 2026',
        skinType: 'Oily',
        result: 'Barrier Support Recommended',
    },
    {
        date: 'March 4, 2026',
        skinType: 'Sensitive',
        result: 'Gentle Routine Suggested',
    },
];

export function AnalysisHistoryCard() {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                    Skin Analysis History
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                    Recent Scans
                </h2>
            </div>

            <div className="mt-6 space-y-4">
                {analyses.map((analysis) => (
                    <div
                        key={analysis.date}
                        className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                    >
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            {analysis.date}
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                            {analysis.skinType}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">{analysis.result}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}