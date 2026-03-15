import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatWindow } from '@/components/chat/ChatWindow';

export default function AiChatPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_25%)]" />

                <Container className="relative py-12 sm:py-16 lg:py-20">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full border border-pink-400/20 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-pink-200 sm:text-xs">
                            AI Beauty Assistant
                        </span>

                        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            Chat with your personal skincare assistant
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                            Ask about routines, ingredients, products, skin concerns, and
                            personalized beauty guidance in a modern conversational interface.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                        <div className="space-y-6">
                            <ChatSidebar />
                        </div>

                        <div>
                            <ChatWindow />
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
}