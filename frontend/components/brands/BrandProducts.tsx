const products = [
    'Hydrating Serum',
    'Vitamin Glow Cream',
    'Barrier Repair Moisturizer',
    'Daily SPF Shield',
];

export function BrandProducts() {
    return (
        <div className="rounded-[1.25rem] border border-[#eadff0] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-6">
            <h2 className="text-2xl font-semibold text-slate-800">
                Featured Products
            </h2>

            <div className="mt-5 space-y-4">
                {products.map((product, index) => (
                    <div
                        key={product}
                        className="flex items-start gap-4 rounded-[1rem] border border-[#eee6f1] bg-[#fcfbfd] p-4"
                    >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-xs font-bold text-white">
                            {index + 1}
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-slate-800">
                                {product}
                            </p>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Skincare product from this brand collection with premium daily-use formulation.
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}