'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Container } from '../container/Container';
import { Button } from '@/components/ui/Button';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Skin Test', href: '/skin-test' },
    { label: 'AI Chat', href: '/ai-chat' },
    { label: 'Products', href: '/products' },
    { label: 'Brands', href: '/brands' },
    { label: 'Dashboard', href: '/dashboard' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-lg font-bold tracking-tight text-white sm:text-xl">
                        GlowGlam AI
                    </Link>

                    <nav className="hidden items-center gap-6 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-slate-300 transition hover:text-white"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Button href="/login" variant="ghost" className="px-4 py-2">
                            Login
                        </Button>
                        <Button href="/signup" className="px-4 py-2">
                            Sign Up
                        </Button>
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-white lg:hidden"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        <span className="text-lg">{isOpen ? '✕' : '☰'}</span>
                    </button>
                </div>

                {isOpen && (
                    <div className="border-t border-white/10 py-4 lg:hidden">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-slate-300 transition hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                                <Button href="/login" variant="ghost" className="w-full">
                                    Login
                                </Button>
                                <Button href="/signup" className="w-full">
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
}