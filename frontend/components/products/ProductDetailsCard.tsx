'use client';

import { useState } from 'react';
import type { ProductItem } from '@/lib/product-data';

export function ProductDetailsCard({ product }: { product: ProductItem }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="rounded-[1.5rem] border border-[#eadff0] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-5 lg:p-6">
      <div className="overflow-hidden rounded-[1.25rem] border border-[#f0e7f3] bg-[#faf7fb]">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[4/3] w-full object-cover transition duration-300 hover:scale-[1.02]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center bg-[linear-gradient(135deg,#f8edf3_0%,#f3edf8_50%,#edf3fb_100%)]">
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-pink-500 to-violet-500 text-4xl font-bold text-white shadow-lg">
              {product.name.charAt(0)}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-slate-800 sm:text-2xl">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">{product.brand}</p>
        </div>

        <div className="rounded-2xl border border-[#f1e7f3] bg-[#fcfbfd] px-4 py-3 text-left sm:min-w-[120px] sm:text-right">
          <p className="text-lg font-semibold text-slate-800">{product.price}</p>
          <p className="mt-1 text-sm font-medium text-amber-500">
            {product.rating}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-500">
        {product.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#f7effa] px-3 py-1 text-xs font-medium text-fuchsia-600">
          {product.type}
        </span>
        <span className="rounded-full bg-[#eef6ff] px-3 py-1 text-xs font-medium text-sky-600">
          AI Pick
        </span>
      </div>

      <button className="mt-6 w-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(236,72,153,0.18)] transition hover:opacity-95 active:scale-[0.99]">
        Save Product
      </button>
    </div>
  );
}