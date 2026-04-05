import Link from 'next/link';

import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { Button } from '@/components/ui/Button';
import { MotionFade } from '@/components/ui/MotionFade';
import { MotionStagger } from '@/components/ui/MotionStagger';
import { getBrands } from '@/lib/brands-api';
import { getProducts } from '@/lib/products-api';

const aiFeatures = [
  {
    title: 'AI Skin Analysis',
    description:
      'Upload a selfie and receive personalized skincare insights powered by AI.',
    icon: '✦',
  },
  {
    title: 'Smart AI Chatbot',
    description:
      'Ask skincare questions and get intelligent beauty guidance anytime.',
    icon: '✧',
  },
  {
    title: 'Personalized Routine',
    description:
      'Discover routines and product suggestions tailored to your skin needs.',
    icon: '✩',
  },
];

function SectionHeading({
  title,
  description,
}: {
  title: React.ReactNode;
  description: string;
}) {
  return (
    <MotionFade className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
        {description}
      </p>
    </MotionFade>
  );
}

export default async function HomePage() {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  const featuredProducts = products.slice(0, 4);
  const featuredBrands = brands.slice(0, 4);

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(96,165,250,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.10),transparent_28%)]" />
          <div className="absolute left-[8%] top-[28%] h-24 w-24 rounded-full bg-pink-300/20 blur-3xl sm:h-36 sm:w-36" />
          <div className="absolute right-[10%] top-[18%] h-24 w-24 rounded-full bg-blue-300/20 blur-3xl sm:h-40 sm:w-40" />

          <Container className="relative py-20 sm:py-24 lg:py-28 xl:py-32">
            <div className="mx-auto max-w-5xl text-center">
              <MotionFade>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-600 shadow-[0_10px_25px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                  <span className="text-base text-violet-500">✧</span>
                  AI Powered Skincare Platform
                </span>
              </MotionFade>

              <MotionFade delay={0.08}>
                <h1 className="mt-8 text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
                  <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600 bg-clip-text text-transparent">
                    Discover Your
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                    Perfect Glow
                  </span>
                </h1>
              </MotionFade>

              <MotionFade delay={0.14}>
                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9 lg:mt-9">
                  Get personalized skincare recommendations powered by advanced
                  AI. Your journey to radiant skin starts here.
                </p>
              </MotionFade>

              <MotionFade delay={0.2}>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row">
                  <Button
                    href="/skin-test"
                    className="w-full max-w-[280px] px-8 py-4 text-base sm:w-auto sm:min-w-[280px] sm:text-lg"
                  >
                    Start Skin Analysis
                  </Button>

                  <Button
                    href="/ai-chat"
                    variant="secondary"
                    className="w-full max-w-[220px] px-8 py-4 text-base sm:w-auto sm:min-w-[190px] sm:text-lg"
                  >
                    Chat with AI
                  </Button>
                </div>
              </MotionFade>
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-blue-50" />

          <Container className="relative">
            <SectionHeading
              title={
                <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                  Powered by AI Technology
                </span>
              }
              description="Experience the future of skincare with our intelligent features."
            />

            <MotionStagger className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
              {aiFeatures.map((feature) => (
                <MotionFade
                  key={feature.title}
                  className="h-full rounded-[1.75rem] border border-white/70 bg-white/85 p-6 shadow-[0_18px_38px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 via-fuchsia-50 to-blue-100 text-2xl text-fuchsia-500 shadow-sm">
                      {feature.icon}
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-slate-800">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </MotionFade>
              ))}
            </MotionStagger>
          </Container>
        </section>

        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-blue-100" />

          <Container className="relative">
            <MotionFade className="mx-auto max-w-5xl">
              <div className="rounded-[2.2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(255,244,250,0.90)_0%,rgba(248,241,252,0.92)_48%,rgba(241,246,255,0.92)_100%)] px-6 py-14 text-center shadow-[0_24px_55px_rgba(15,23,42,0.10)] sm:px-10 sm:py-16 lg:px-16 lg:py-18">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/75 text-2xl text-fuchsia-500 shadow-sm">
                  ✧
                </div>

                <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.8rem]">
                  <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                    Try Our AI Skin Analysis
                  </span>
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
                  Upload your photo and get instant personalized insights about
                  your skin.
                </p>

                <div className="mt-10">
                  <Button
                    href="/skin-test"
                    className="px-8 py-4 text-base sm:px-10 sm:text-lg"
                  >
                    Start Skin Analysis
                  </Button>
                </div>
              </div>
            </MotionFade>
          </Container>
        </section>

        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-purple-50" />

          <Container className="relative">
            <SectionHeading
              title={
                <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-blue-600 bg-clip-text text-transparent">
                  Popular Products
                </span>
              }
              description="Explore trending skincare picks from our curated collection."
            />

            <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <MotionFade
                  key={product.id}
                  className="h-full rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-[0_18px_38px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-full flex-col">
                    <div className="overflow-hidden rounded-2xl bg-[#f7f2f7]">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-44 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-pink-200 via-fuchsia-100 to-blue-200">
                          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 text-2xl font-bold text-white shadow-lg">
                            {product.name.charAt(0)}
                          </div>
                        </div>
                      )}
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-800">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {product.brand}
                    </p>

                    <p className="mt-3 text-lg font-bold text-slate-800">
                      {product.price}
                    </p>

                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-4 inline-flex w-full justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(168,85,247,0.20)] transition hover:opacity-95"
                    >
                      View Product
                    </Link>
                  </div>
                </MotionFade>
              ))}
            </MotionStagger>
          </Container>
        </section>

        <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-pink-50" />

          <Container className="relative">
            <SectionHeading
              title={
                <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                  Featured Brands
                </span>
              }
              description="Explore trusted skincare brands curated for different skin needs."
            />

            <MotionStagger className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {featuredBrands.map((brand) => (
                <MotionFade
                  key={brand.id}
                  className="h-full rounded-[1.75rem] border border-white/70 bg-white/85 p-6 text-center shadow-[0_18px_38px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-full flex-col">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 via-fuchsia-50 to-blue-100 text-2xl font-bold text-fuchsia-600 shadow-sm">
                      {brand.name.charAt(0)}
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-slate-800">
                      {brand.name}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {brand.description}
                    </p>

                    <p className="mt-3 text-xs font-medium text-fuchsia-600">
                      {brand.productsCount} product
                      {brand.productsCount === 1 ? '' : 's'}
                    </p>

                    <Link
                      href={`/brands/${brand.slug}`}
                      className="mt-5 inline-flex justify-center rounded-full border border-fuchsia-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-fuchsia-50"
                    >
                      Explore Brand
                    </Link>
                  </div>
                </MotionFade>
              ))}
            </MotionStagger>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}