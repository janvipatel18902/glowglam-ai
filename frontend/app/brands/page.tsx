import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Container } from "@/components/layout/container/Container";
import { MotionFade } from "@/components/ui/MotionFade";
import { BrandGrid } from "@/components/brands/BrandGrid";

export default function BrandsPage() {
  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <main className="bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]">
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <MotionFade>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#eadff0] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <span className="text-violet-500">✦</span>
                Trusted Partners
              </span>
            </MotionFade>

            <MotionFade delay={0.08}>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                  Our Brands
                </span>
              </h1>
            </MotionFade>

            <MotionFade delay={0.16}>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Partnered with the world&apos;s leading skincare brands.
              </p>
            </MotionFade>
          </div>

          <MotionFade delay={0.24}>
            <div className="mx-auto mt-12 max-w-6xl rounded-[1.25rem] border border-[#eadff0] bg-white/75 p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur sm:p-6">
              <BrandGrid />
            </div>
          </MotionFade>

          <MotionFade delay={0.32}>
            <div className="mx-auto mt-10 max-w-4xl rounded-[1.25rem] border border-[#eadff0] bg-white p-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <h2 className="text-2xl font-semibold text-fuchsia-700">
                Want to Partner With Us?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Join our growing network of premium skincare brands.
              </p>

              <button className="mt-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95">
                Contact Us
              </button>
            </div>
          </MotionFade>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
