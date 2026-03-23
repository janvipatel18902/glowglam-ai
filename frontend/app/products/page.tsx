import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';
import { ProductGrid } from '@/components/products/ProductGrid';

export default function ProductsPage() {
    return (
        <div className="min-h-screen text-slate-800">
            <Navbar />

            <main className="bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]">
                <Container className="py-10 sm:py-12 lg:py-14">
                    <MotionFade>
                        <div className="mb-8 flex flex-col gap-4 rounded-[1.25rem] border border-[#eadff0] bg-white/80 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                            <div className="relative w-full sm:max-w-xl">
                                <input
                                    type="text"
                                    placeholder="Search by product, ingredient, or concern..."
                                    className="h-12 w-full rounded-full border border-[#eadff0] bg-white px-5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2 text-sm font-medium text-white">
                                    All
                                </button>
                                <button className="rounded-full border border-[#eadff0] bg-white px-4 py-2 text-sm font-medium text-slate-600">
                                    Sort
                                </button>
                            </div>
                        </div>
                    </MotionFade>

                    <MotionFade delay={0.08}>
                        <ProductGrid />
                    </MotionFade>
                </Container>
            </main>

            <Footer />
        </div>
    );
}