import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Container } from "@/components/layout/container/Container";
import { MotionFade } from "@/components/ui/MotionFade";
import { BrandDetailsCard } from "@/components/brands/BrandDetailsCard";
import { BrandProducts } from "@/components/brands/BrandProducts";

export default function BrandDetailsPage() {
  const brand = {
    name: "GlowLab",
    description:
      "GlowLab creates modern skincare products focused on hydration, radiance, and soft healthy skin with elegant daily formulas.",
    focus: "Hydration, glow, and everyday skin wellness",
  };

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <main className="bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <MotionFade>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eadff0] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <span className="text-violet-500">✦</span>
                Brand Story
              </span>
            </MotionFade>

            <MotionFade delay={0.08}>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  {brand.name}
                </span>
              </h1>
            </MotionFade>

            <MotionFade delay={0.16}>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Explore trusted skincare philosophy, featured products, and what
                makes this brand special.
              </p>
            </MotionFade>
          </div>

          <MotionFade delay={0.24}>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
              <BrandDetailsCard brand={brand} />
              <BrandProducts />
            </div>
          </MotionFade>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
