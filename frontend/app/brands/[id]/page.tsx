import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { BrandDetailsCard } from '@/components/brands/BrandDetailsCard';
import { BrandProducts } from '@/components/brands/BrandProducts';

export default function BrandDetailsPage() {
    const brand = {
        name: 'GlowLab',
        description:
            'GlowLab creates modern skincare products focused on hydration, radiance, and soft healthy skin with elegant daily formulas.',
        focus: 'Hydration, glow, and everyday skin wellness',
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.20),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_25%)]" />

                <Container className="relative py-12 sm:py-16 lg:py-20">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <BrandDetailsCard brand={brand} />
                        <BrandProducts />
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}