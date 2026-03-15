import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { AnalysisHistoryCard } from '@/components/dashboard/AnalysisHistoryCard';
import { ChatHistoryCard } from '@/components/dashboard/ChatHistoryCard';

export default function HistoryPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_25%)]" />

                <Container className="relative py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-pink-200 sm:text-xs">
                            Activity History
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            View your beauty journey timeline
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                            Review your past skin scans and AI beauty conversations in one
                            clean, modern history page.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 xl:grid-cols-2">
                        <AnalysisHistoryCard />
                        <ChatHistoryCard />
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}