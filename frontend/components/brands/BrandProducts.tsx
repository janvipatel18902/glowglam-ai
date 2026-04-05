import Link from 'next/link';
import type { ProductItem } from '@/lib/products-api';

type BrandProductsProps = {
  products: ProductItem[];
};

export function BrandProducts({ products }: BrandProductsProps) {
  return (
    <div className="rounded-[1.25rem] border border-[#eadff0] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-6">
      <h2 className="text-2xl font-semibold text-slate-800">
        Featured Products
      </h2>

      <div className="mt-5 space-y-4">
        {products.length === 0 ? (
          <div className="rounded-[1rem] border border-[#eee6f1] bg-[#fcfbfd] p-4">
            <p className="text-sm text-slate-500">
              No products found for this brand yet.
            </p>
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={product.id}
              className="flex items-start gap-4 rounded-[1rem] border border-[#eee6f1] bg-[#fcfbfd] p-4"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-xs font-bold text-white">
                {index + 1}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {product.name}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {product.description}
                </p>

                <Link
                  href={`/products/${product.slug}`}
                  className="mt-3 inline-flex text-sm font-medium text-fuchsia-600 hover:text-fuchsia-700"
                >
                  View product →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}