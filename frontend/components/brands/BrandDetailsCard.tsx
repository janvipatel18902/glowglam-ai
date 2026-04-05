import Link from 'next/link';
import type { BrandDetails } from '@/lib/brands-api';

export function BrandDetailsCard({ brand }: { brand: BrandDetails }) {
  return (
    <div className="rounded-[1.25rem] border border-[#eadff0] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] bg-gradient-to-br from-pink-500 to-violet-500 text-2xl font-bold text-white shadow-md">
        {brand.name.charAt(0)}
      </div>

      <h1 className="mt-5 text-2xl font-semibold text-slate-800 sm:text-3xl">
        {brand.name}
      </h1>

      <p className="mt-4 text-sm leading-7 text-slate-500">
        {brand.description}
      </p>

      <div className="mt-5 rounded-[1rem] border border-[#eee6f1] bg-[#fcfbfd] p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
          Brand Focus
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Premium skincare solutions designed to support healthy-looking skin.
        </p>
      </div>

      <p className="mt-4 text-sm font-medium text-fuchsia-600">
        {brand.productsCount} product{brand.productsCount === 1 ? '' : 's'} available
      </p>

      <Link
        href="/products"
        className="mt-5 inline-flex rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
      >
        Explore Products
      </Link>
    </div>
  );
}