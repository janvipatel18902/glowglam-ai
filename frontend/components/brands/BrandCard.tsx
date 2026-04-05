import Link from 'next/link';
import type { BrandItem } from '@/lib/brands-api';

export function BrandCard({ brand }: { brand: BrandItem }) {
  return (
    <div className="rounded-[1.1rem] border border-[#eadff0] bg-white p-5 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(236,72,153,0.10)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fde7f3_0%,#f1e7ff_55%,#e8f1ff_100%)] shadow-sm">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-violet-500 text-sm font-bold text-white">
          {brand.name.charAt(0)}
        </div>
      </div>

      <h3 className="mt-4 text-base font-semibold text-slate-800">
        {brand.name}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {brand.description}
      </p>

      <p className="mt-2 text-xs font-medium text-fuchsia-600">
        {brand.productsCount} product{brand.productsCount === 1 ? '' : 's'}
      </p>

      <Link
        href={`/brands/${brand.slug}`}
        className="mt-5 inline-flex rounded-full border border-[#eadff0] bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#faf7fb]"
      >
        View Products →
      </Link>
    </div>
  );
}