type Product = {
    name: string;
    brand: string;
    type: string;
    image?: string;
    price?: string;
    rating?: string;
};

export function ProductCard({ product }: { product: Product }) {
    return (
        <div className="overflow-hidden rounded-[1.1rem] border border-[#eadff0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(236,72,153,0.10)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f2f7]">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f7eef7_0%,#f5edf8_55%,#edf3fb_100%)]">
                        <div className="flex h-20 w-20 items-center justify-center rounded-[1.3rem] bg-gradient-to-br from-pink-500 to-violet-500 text-3xl font-bold text-white shadow-lg">
                            {product.name.charAt(0)}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                            {product.brand}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-semibold text-slate-800">
                            {product.price ?? '$45.00'}
                        </p>
                        <p className="mt-1 text-xs text-amber-500">
                            {product.rating ?? '★ 4.8'}
                        </p>
                    </div>
                </div>

                <p className="mt-3 text-xs leading-6 text-slate-500 sm:text-sm">
                    Premium skincare product for glow, hydration, and smoother skin.
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-[#f7effa] px-3 py-1 text-[11px] font-medium text-fuchsia-600">
                        {product.type}
                    </span>

                    <button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-95 sm:text-sm">
                        View Product
                    </button>
                </div>
            </div>
        </div>
    );
}