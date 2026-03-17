'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Container } from '../container/Container';

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
        <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur-xl">
            <Container>
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-blue-400 text-lg text-white shadow-[0_8px_20px_rgba(168,85,247,0.22)]">
                            ✧
                        </div>
                        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
                            GlowGlam AI
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-10 lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-[17px] font-medium text-slate-600 transition hover:text-slate-900"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-4 lg:flex">
                        <Button href="/login" variant="ghost" className="px-4 py-2">
                            Login
                        </Button>
                        <Button href="/signup" className="px-8 py-3">
                            Sign Up
                        </Button>
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 lg:hidden"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        <span className="text-lg">{isOpen ? '✕' : '☰'}</span>
                    </button>
                </div>

                {isOpen && (
                    <div className="border-t border-pink-100 py-4 lg:hidden">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-base text-slate-600 transition hover:text-slate-900"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                                <Button href="/login" variant="secondary" className="w-full">
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