import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { BrandGrid } from '@/components/brands/BrandGrid';

export default function BrandsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_25%)]" />

                <Container className="relative py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-pink-200 sm:text-xs">
                            Trusted Beauty Brands
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            Explore skincare brands you’ll love
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                            Discover premium and modern skincare brands curated for different
                            skin concerns, goals, and routines.
                        </p>
                    </div>

                    <div className="mt-12">
                        <BrandGrid />
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}