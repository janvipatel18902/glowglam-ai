import { Navbar } from '@/components/layout/navbar/Navbar';
import { Footer } from '@/components/layout/footer/Footer';
import { Container } from '@/components/layout/container/Container';

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
        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <main className="relative overflow-hidden">

                <Container className="py-12">

                    <div className="grid gap-6 lg:grid-cols-2">

                        <ProductDetailsCard product={product} />

                        <ProductInfo />

                    </div>

                </Container>

            </main>

            <Footer />

        </div>
    );
}