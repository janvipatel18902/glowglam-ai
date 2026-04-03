import { ProductCard } from './ProductCard';
import type { ProductItem } from '@/lib/product-data';

type ProductGridProps = {
  products: ProductItem[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-[1.25rem] border border-[#eadff0] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <h3 className="text-lg font-semibold text-slate-800">
          No products found
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Try another search or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}