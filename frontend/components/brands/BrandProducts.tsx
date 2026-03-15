const products = [
    'Hydrating Serum',
    'Vitamin Glow Cream',
    'Barrier Repair Moisturizer',
    'Daily SPF Shield',
];

export function BrandProducts() {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">
                Featured Products
            </h2>

            <div className="mt-5 space-y-4">
                {products.map((product) => (
                    <div
                        key={product}
                        className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                    >
                        <p className="text-sm font-medium text-white sm:text-base">
                            {product}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                            Skincare product from this brand collection.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}