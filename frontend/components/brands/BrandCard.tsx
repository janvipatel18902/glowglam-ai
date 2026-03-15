type Brand = {
    name: string;
    description: string;
};

export function BrandCard({ brand }: { brand: Brand }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-400/20 hover:bg-white/8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 text-xl font-bold text-white">
                {brand.name.charAt(0)}
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">{brand.name}</h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
                {brand.description}
            </p>

            <button
                type="button"
                className="mt-5 rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
                View Brand
            </button>
        </div>
    );
}