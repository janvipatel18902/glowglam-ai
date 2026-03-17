import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';

import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilter } from '@/components/products/ProductFilter';

export default function ProductsPage() {
    return (
        <div className="min-h-screen text-slate-800">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8edf3_0%,#f3edf8_50%,#edf3fb_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.10),transparent_28%)]" />

                <Container className="relative py-14 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-4xl text-center">
                        <MotionFade>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-600 shadow">
                                <span className="text-violet-500">✧</span>
                                Skincare Collection
                            </span>
                        </MotionFade>

                        <MotionFade delay={0.08}>
                            <h1 className="mt-7 text-4xl font-bold sm:text-5xl lg:text-6xl">
                                <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                                    Skincare Products
                                </span>
                            </h1>
                        </MotionFade>

                        <MotionFade delay={0.16}>
                            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 sm:text-base lg:text-lg">
                                Explore recommended skincare products based on your skin type.
                            </p>
                        </MotionFade>
                    </div>

                    <MotionFade delay={0.22}>
                        <div className="mt-12 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
                            <aside className="lg:sticky lg:top-24 lg:self-start">
                                <div className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                                    <div className="mb-4">
                                        <h2 className="text-lg font-semibold text-slate-800">
                                            Filters
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Choose product category
                                        </p>
                                    </div>

                                    <ProductFilter />
                                </div>
                            </aside>

                            <section className="min-w-0">
                                <div className="rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-5 lg:p-6">
                                    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
                                                Recommended Products
                                            </h2>
                                            <p className="mt-1 text-sm text-slate-500 sm:text-base">
                                                Find cleansers, serums, moisturizers, and more.
                                            </p>
                                        </div>
                                    </div>

                                    <ProductGrid />
                                </div>
                            </section>
                        </div>
                    </MotionFade>
                </Container>
            </main>

            <Footer />
        </div>
    );
}