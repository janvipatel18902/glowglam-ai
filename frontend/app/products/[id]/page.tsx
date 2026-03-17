import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';

import { ProductDetailsCard } from '@/components/products/ProductDetailsCard';
import { ProductInfo } from '@/components/products/ProductInfo';

export default function ProductDetailsPage() {
    const product = {
        name: 'Hydrating Serum',
        brand: 'GlowLab',
        type: 'Serum',
        description:
            'A lightweight hydrating serum designed to improve skin glow and moisture balance.',
    };

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
                                Product Details
                            </span>
                        </MotionFade>

                        <MotionFade delay={0.08}>
                            <h1 className="mt-7 text-4xl font-bold sm:text-5xl lg:text-6xl">
                                <span className="bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                                    {product.name}
                                </span>
                            </h1>
                        </MotionFade>

                        <MotionFade delay={0.16}>
                            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 sm:text-base lg:text-lg">
                                Discover product details, benefits, and how it fits into your skincare routine.
                            </p>
                        </MotionFade>
                    </div>

                    <MotionFade delay={0.22}>
                        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
                            <section className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
                                <div className="mb-5">
                                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                                        Featured Product
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold text-slate-800">
                                        {product.brand} {product.type}
                                    </h2>
                                </div>

                                <ProductDetailsCard product={product} />
                            </section>

                            <section className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6 lg:p-7">
                                <div className="mb-5">
                                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                                        Details
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold text-slate-800">
                                        Product Information
                                    </h2>
                                </div>

                                <ProductInfo />
                            </section>
                        </div>
                    </MotionFade>
                </Container>
            </main>

            <Footer />
        </div>
    );
}