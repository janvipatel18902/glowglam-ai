'use client';

import { useMemo, useState } from 'react';

import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';
import { ProductGrid } from '@/components/products/ProductGrid';
import { products as allProducts } from '@/lib/product-data';

type FilterType = 'All' | 'Serum' | 'Cream' | 'Cleanser' | 'Moisturizer' | 'Treatment';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filters: FilterType[] = [
    'All',
    'Serum',
    'Cream',
    'Cleanser',
    'Moisturizer',
    'Treatment',
  ];

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesFilter =
        activeFilter === 'All' ? true : product.type === activeFilter;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <main className="bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]">
        <Container className="py-10 sm:py-12 lg:py-14">
          <MotionFade>
            <div className="mb-8 rounded-[1.5rem] border border-[#eadff0] bg-white/80 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur sm:p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="w-full lg:max-w-xl">
                  <input
                    type="text"
                    placeholder="Search by product, brand, or concern..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-12 w-full rounded-full border border-[#eadff0] bg-white px-5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={
                        activeFilter === filter
                          ? 'rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2 text-sm font-medium text-white'
                          : 'rounded-full border border-[#eadff0] bg-white px-4 py-2 text-sm font-medium text-slate-600'
                      }
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </MotionFade>

          <MotionFade delay={0.08}>
            <ProductGrid products={filteredProducts} />
          </MotionFade>
        </Container>
      </main>

      <Footer />
    </div>
  );
}