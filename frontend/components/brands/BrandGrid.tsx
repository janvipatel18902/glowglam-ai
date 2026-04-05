import type { BrandItem } from '@/lib/brands-api';
import { BrandCard } from './BrandCard';

type BrandGridProps = {
  brands: BrandItem[];
};

export function BrandGrid({ brands }: BrandGridProps) {
  if (!brands.length) {
    return (
      <div className="rounded-[1.25rem] border border-[#eadff0] bg-white p-10 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <h3 className="text-lg font-semibold text-slate-800">
          No brands found
        </h3>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}