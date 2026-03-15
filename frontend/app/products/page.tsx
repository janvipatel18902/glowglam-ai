import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { Container } from '@/components/layout/container/Container';

import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilter } from '@/components/products/ProductFilter';

export default function ProductsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <main className="relative overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.2),transparent_30%)]" />

                <Container className="relative py-12">

                    <div className="text-center max-w-3xl mx-auto">

                        <h1 className="text-4xl font-bold">
                            Skincare Products
                        </h1>

                        <p className="mt-4 text-slate-300">
                            Explore recommended skincare products based on your skin type.
                        </p>

                    </div>

                    <div className="mt-12 grid gap-6 lg:grid-cols-[260px_1fr]">

                        <ProductFilter />

                        <ProductGrid />

                    </div>

                </Container>

            </main>

            <Footer />

        </div>
    );
}