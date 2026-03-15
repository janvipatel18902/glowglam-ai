import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { ProfileSummaryCard } from '@/components/dashboard/ProfileSummaryCard';
import { ProfileDetailsCard } from '@/components/dashboard/ProfileDetailsCard';

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.20),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.16),transparent_25%)]" />

                <Container className="relative py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-pink-200 sm:text-xs">
                            Your Beauty Profile
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            Manage your skincare identity
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                            View your skin profile, account details, and beauty preferences in
                            one elegant dashboard.
                        </p>
                    </div>

                    <div className="mt-12 space-y-6">
                        <ProfileSummaryCard />
                        <ProfileDetailsCard />
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}