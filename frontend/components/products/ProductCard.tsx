type Product = {
    name: string;
    brand: string;
    type: string;
};

export function ProductCard({ product }: { product: Product }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:-translate-y-1 hover:border-pink-400/20">
            <div className="h-40 rounded-2xl bg-gradient-to-br from-pink-400/20 to-violet-400/20" />

            <h3 className="mt-4 text-lg font-semibold text-white">
                {product.name}
            </h3>

            <p className="text-sm text-slate-300">
                {product.brand}
            </p>

            <p className="mt-1 text-xs text-pink-200">
                {product.type}
            </p>

            <button className="mt-4 w-full rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600">
                View
            </button>
        </div>
    );
}