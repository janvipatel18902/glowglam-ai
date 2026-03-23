'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-[#ecdff1] bg-white/95 backdrop-blur-xl">
            <Container>
                <div className="flex h-[76px] items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-base text-white shadow-[0_8px_18px_rgba(168,85,247,0.25)]">
                            ✧
                        </div>

                        <span className="bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 bg-clip-text text-[1.8rem] font-bold tracking-tight text-transparent">
                            GlowGlam AI
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-8 lg:flex">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={
                                        isActive
                                            ? 'text-[15px] font-semibold text-fuchsia-600'
                                            : 'text-[15px] font-medium text-slate-600 transition hover:text-slate-900'
                                    }
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Buttons */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <Button
                            href="/login"
                            variant="ghost"
                            className="rounded-full px-4 py-2 text-sm"
                        >
                            Login
                        </Button>

                        <Button
                            href="/signup"
                            className="rounded-full px-6 py-2.5 text-sm shadow-[0_8px_18px_rgba(236,72,153,0.18)]"
                        >
                            Sign Up
                        </Button>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-xl border border-[#eadff0] bg-white p-2 text-slate-700 lg:hidden"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="border-t border-[#ecdff1] py-4 lg:hidden">
                        <div className="flex flex-col gap-3">

                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;

                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className={
                                            isActive
                                                ? 'rounded-xl bg-fuchsia-50 px-3 py-2 text-sm font-semibold text-fuchsia-600'
                                                : 'rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50'
                                        }
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}

                            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                                <Button href="/login" variant="secondary" className="w-full rounded-full">
                                    Login
                                </Button>

                                <Button href="/signup" className="w-full rounded-full">
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