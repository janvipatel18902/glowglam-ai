type Product = {
    name: string;
    brand: string;
    type: string;
    description: string;
};

export function ProductDetailsCard({ product }: { product: Product }) {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

            <div className="h-64 rounded-2xl bg-gradient-to-br from-pink-400/20 to-violet-400/20" />

            <h1 className="mt-6 text-3xl font-bold text-white">
                {product.name}
            </h1>

            <p className="mt-2 text-sm text-pink-200">
                {product.brand} • {product.type}
            </p>

            <p className="mt-4 text-sm text-slate-300 leading-6">
                {product.description}
            </p>

            <button className="mt-6 rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white hover:bg-pink-600">
                Save Product
            </button>

        </div>
    );
}