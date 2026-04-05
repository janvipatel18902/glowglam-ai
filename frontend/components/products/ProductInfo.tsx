import type { ProductItem } from '@/lib/products-api';

export function ProductInfo({ product }: { product: ProductItem }) {
  const info = [
    { label: 'Skin Type', value: product.skinType },
    { label: 'Usage', value: product.usage },
    { label: 'Category', value: product.category },
    { label: 'AI Recommended', value: product.aiRecommended },
  ];

  return (
    <div className="space-y-3">
      {info.map((item) => (
        <div
          key={item.label}
          className="rounded-[1rem] border border-[#eee6f1] bg-[#fcfbfd] p-4"
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
            {item.label}
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-700">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}