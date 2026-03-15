export function ProductFilter() {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">
                Filters
            </h2>

            <div className="mt-4 space-y-3">

                <button className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white">
                    All
                </button>

                <button className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white">
                    Cleanser
                </button>

                <button className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white">
                    Serum
                </button>

                <button className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white">
                    Moisturizer
                </button>

                <button className="w-full rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white">
                    Sunscreen
                </button>

            </div>
        </div>
    );
}