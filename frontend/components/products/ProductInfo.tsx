export function ProductInfo() {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">

            <h2 className="text-xl font-semibold text-white">
                Product Info
            </h2>

            <div className="mt-4 space-y-3">

                <div className="rounded-xl bg-slate-900/70 p-3 text-sm text-slate-300">
                    Skin Type: All
                </div>

                <div className="rounded-xl bg-slate-900/70 p-3 text-sm text-slate-300">
                    Usage: Daily
                </div>

                <div className="rounded-xl bg-slate-900/70 p-3 text-sm text-slate-300">
                    Category: Serum
                </div>

                <div className="rounded-xl bg-slate-900/70 p-3 text-sm text-slate-300">
                    AI Recommended: Yes
                </div>

            </div>

        </div>
    );
}