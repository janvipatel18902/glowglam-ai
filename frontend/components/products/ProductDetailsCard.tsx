type Product = {
    name: string;
    brand: string;
    type: string;
    description: string;
    image?: string;
    price?: string;
    rating?: string;
};

export function ProductDetailsCard({ product }: { product: Product }) {
    return (
        <div className="rounded-[1.25rem] border border-[#eadff0] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-5">
            <div className="overflow-hidden rounded-[1rem] border border-[#f0e7f3] bg-[#faf7fb]">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="aspect-[4/3] w-full object-cover"
                    />
                ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,#f8edf3_0%,#f3edf8_50%,#edf3fb_100%)]">
                        <div className="flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-pink-500 to-violet-500 text-4xl font-bold text-white shadow-lg">
                            {product.name.charAt(0)}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                        {product.name}
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        {product.brand}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-lg font-semibold text-slate-800">
                        {product.price ?? '$45.00'}
                    </p>
                    <p className="mt-1 text-sm text-amber-500">
                        {product.rating ?? '★ 4.8'}
                    </p>
                </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-500">
                {product.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#f7effa] px-3 py-1 text-xs font-medium text-fuchsia-600">
                    {product.type}
                </span>
                <span className="rounded-full bg-[#eef6ff] px-3 py-1 text-xs font-medium text-sky-600">
                    Best Seller
                </span>
            </div>

            <button className="mt-5 w-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95">
                Save Product
            </button>
        </div>
    );
}