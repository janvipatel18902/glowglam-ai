import Link from 'next/link';

import { Container } from '../container/Container';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-slate-950">
            <Container className="py-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-base font-semibold text-white">GlowGlam AI</p>
                        <p className="mt-2 text-sm text-slate-400">
                            Smart skincare analysis powered by AI.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                        <Link href="/" className="transition hover:text-white">
                            Home
                        </Link>
                        <Link href="/products" className="transition hover:text-white">
                            Products
                        </Link>
                        <Link href="/brands" className="transition hover:text-white">
                            Brands
                        </Link>
                        <Link href="/ai-chat" className="transition hover:text-white">
                            AI Chat
                        </Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}