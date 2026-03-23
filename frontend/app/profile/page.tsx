import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { ProfileSummaryCard } from '@/components/dashboard/ProfileSummaryCard';
import { ProfileDetailsCard } from '@/components/dashboard/ProfileDetailsCard';

export default function ProfilePage() {
    return (
        <div className="min-h-screen text-slate-800">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.10),transparent_24%),radial-gradient(circle_at_center_top,rgba(139,92,246,0.08),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.08),transparent_22%)]" />

                <Container className="relative py-14 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-[780px] text-center">
                        <span className="inline-flex rounded-full border border-[#eadff0] bg-white px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-fuchsia-600 shadow-sm sm:text-xs">
                            Your Beauty Profile
                        </span>

                        <h1 className="mx-auto mt-7 max-w-[720px] text-4xl font-bold leading-[1.08] tracking-tight text-slate-800 sm:text-5xl lg:text-[4rem]">
                            Manage your skincare identity
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                            View your skin profile, account details, and beauty preferences in
                            one elegant dashboard.
                        </p>
                    </div>

                    <div className="mx-auto mt-14 max-w-[920px] space-y-6">
                        <ProfileSummaryCard />
                        <ProfileDetailsCard />
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}