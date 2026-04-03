import { notFound } from 'next/navigation';

import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';
import { ProductDetailsCard } from '@/components/products/ProductDetailsCard';
import { ProductInfo } from '@/components/products/ProductInfo';
import { products } from '@/lib/product-data';

type ProductDetailsPageProps = {
  params: {
    id: string;
  };
};

export default function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <main className="bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <MotionFade>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eadff0] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <span className="text-violet-500">✦</span>
                Product Details
              </span>
            </MotionFade>

            <MotionFade delay={0.08}>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  {product.name}
                </span>
              </h1>
            </MotionFade>

            <MotionFade delay={0.16}>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Discover product details, benefits, and how it fits into your
                skincare routine.
              </p>
            </MotionFade>
          </div>

          <MotionFade delay={0.24}>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
              <ProductDetailsCard product={product} />
              <ProductInfo product={product} />
            </div>
          </MotionFade>
        </Container>
      </main>

      <Footer />
    </div>
  );
}