type Brand = {
    name: string;
    description: string;
    focus: string;
};

export function BrandDetailsCard({ brand }: { brand: Brand }) {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-pink-500/10 backdrop-blur-xl">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 text-3xl font-bold text-white">
                {brand.name.charAt(0)}
            </div>

            <h1 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                {brand.name}
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                {brand.description}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Brand Focus
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                    {brand.focus}
                </p>
            </div>

            <button
                type="button"
                className="mt-6 rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
                Explore Products
            </button>
        </div>
    );
}