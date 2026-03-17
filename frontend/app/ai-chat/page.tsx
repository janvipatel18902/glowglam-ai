'use client';

import { useEffect, useRef, useState } from 'react';

import { Footer } from '@/components/layout/footer/Footer';
import { Navbar } from '@/components/layout/navbar/Navbar';
import { Container } from '@/components/layout/container/Container';
import { MotionFade } from '@/components/ui/MotionFade';

type Message = {
    id: number;
    role: 'user' | 'ai';
    text: string;
    time: string;
};

const initialMessages: Message[] = [
    {
        id: 1,
        role: 'ai',
        text: "Hello! I'm your AI skincare assistant. How can I help you today?",
        time: '03:43 PM',
    },
];

const suggestions = [
    'What products are good for dry skin?',
    'How do I reduce acne?',
    'Best anti-aging ingredients?',
    'Should I use retinol?',
];

function getCurrentTime() {
    return new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
}

function getAiReply(input: string) {
    const normalized = input.toLowerCase();

    if (normalized.includes('dry skin')) {
        return 'For dry skin, focus on a gentle cleanser, hydrating serum with hyaluronic acid, ceramide moisturizer, and daily sunscreen.';
    }

    if (normalized.includes('acne')) {
        return 'For acne-prone skin, use a gentle cleanser, non-comedogenic moisturizer, sunscreen, and ingredients like salicylic acid or niacinamide.';
    }

    if (normalized.includes('retinol')) {
        return 'Retinol is best introduced slowly, usually 2 to 3 nights per week, followed by moisturizer. Always use sunscreen during the day.';
    }

    if (normalized.includes('anti-aging')) {
        return 'Popular anti-aging ingredients include retinol, peptides, vitamin C, hyaluronic acid, and daily broad-spectrum sunscreen.';
    }

    return 'Based on your skincare question, I recommend keeping your routine simple, consistent, and focused on your main concern. You can also use skin analysis for more personalized guidance.';
}

export default function AiChatPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState('');

    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
        });
    }, [messages]);

    function sendMessage(text: string) {
        const trimmed = text.trim();
        if (!trimmed) return;

        const baseId = Date.now();

        const userMessage: Message = {
            id: baseId,
            role: 'user',
            text: trimmed,
            time: getCurrentTime(),
        };

        const aiMessage: Message = {
            id: baseId + 1,
            role: 'ai',
            text: getAiReply(trimmed),
            time: getCurrentTime(),
        };

        setMessages((prev) => [...prev, userMessage, aiMessage]);
        setInput('');
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        sendMessage(input);
    }

    return (
        <div className="min-h-screen text-slate-800">
            <Navbar />

            <main className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7edf3_0%,#f1ebf8_48%,#edf2fb_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(96,165,250,0.10),transparent_26%)]" />

                <Container className="relative py-10 sm:py-14 lg:py-20">
                    <div className="mx-auto max-w-4xl text-center">
                        <MotionFade>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-5 sm:py-3 sm:text-sm">
                                <span className="text-violet-500">✧</span>
                                AI Beauty Assistant
                            </span>
                        </MotionFade>

                        <MotionFade delay={0.08}>
                            <h1 className="mt-6 text-3xl font-bold leading-tight sm:mt-8 sm:text-5xl lg:text-6xl">
                                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                                    Chat with AI
                                </span>
                            </h1>
                        </MotionFade>
                    </div>

                    <MotionFade delay={0.16} className="mx-auto mt-8 max-w-5xl sm:mt-12">
                        <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/82 shadow-[0_24px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:rounded-[2.25rem]">
                            <div
                                ref={chatContainerRef}
                                className="h-[420px] overflow-y-auto px-4 py-5 sm:h-[500px] sm:px-6 sm:py-6 lg:h-[560px] lg:px-8"
                            >
                                <div className="space-y-4 sm:space-y-5">
                                    {messages.map((message) => {
                                        const isAi = message.role === 'ai';

                                        return (
                                            <div
                                                key={message.id}
                                                className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}
                                            >
                                                <div
                                                    className={`max-w-[92%] sm:max-w-[82%] lg:max-w-[75%] ${isAi ? 'text-left' : 'text-right'
                                                        }`}
                                                >
                                                    <div
                                                        className={`mb-2 flex items-center gap-2 sm:gap-3 ${isAi ? 'justify-start' : 'justify-end'
                                                            }`}
                                                    >
                                                        {isAi ? (
                                                            <>
                                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-400 to-blue-400 text-base text-white shadow-md sm:h-10 sm:w-10 sm:text-lg">
                                                                    🤖
                                                                </div>
                                                                <span className="text-[11px] text-slate-400 sm:text-sm">
                                                                    {message.time}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="text-[11px] text-slate-400 sm:text-sm">
                                                                    {message.time}
                                                                </span>
                                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 text-xs font-semibold text-white shadow-md sm:h-10 sm:w-10 sm:text-sm">
                                                                    U
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>

                                                    <div
                                                        className={`rounded-[1.25rem] px-4 py-3.5 shadow-sm sm:rounded-[1.5rem] sm:px-5 sm:py-4 ${isAi
                                                                ? 'bg-slate-50 text-slate-700'
                                                                : 'bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 text-white'
                                                            }`}
                                                    >
                                                        <p className="text-sm leading-6 sm:text-base sm:leading-8">
                                                            {message.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div ref={bottomRef} />
                                </div>
                            </div>

                            <div className="border-t border-fuchsia-100 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
                                <p className="mb-3 text-left text-sm font-medium text-slate-600 sm:mb-4 sm:text-base">
                                    Suggested questions:
                                </p>

                                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                                    {suggestions.map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => sendMessage(item)}
                                            className="rounded-full border border-fuchsia-200 bg-white px-3.5 py-2 text-xs text-slate-600 transition hover:bg-fuchsia-50 sm:px-5 sm:py-3 sm:text-sm lg:text-base"
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-fuchsia-100 p-4 sm:p-6 lg:p-8">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                                >
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask me anything about skincare..."
                                        className="h-12 w-full rounded-full border border-fuchsia-200 bg-white px-5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-fuchsia-300 sm:h-14 sm:flex-1 sm:px-6 sm:text-base lg:px-7 lg:text-lg"
                                    />

                                    <button
                                        type="submit"
                                        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 px-6 text-lg text-white shadow-md transition hover:opacity-95 sm:h-14 sm:w-auto sm:min-w-[78px] sm:px-0 sm:text-xl"
                                    >
                                        ↗
                                    </button>
                                </form>
                            </div>
                        </div>
                    </MotionFade>
                </Container>
            </main>

            <Footer />
        </div>
    );
}