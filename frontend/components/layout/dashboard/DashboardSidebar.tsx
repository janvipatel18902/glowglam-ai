'use client';

import Link from 'next/link';

const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Skin Test', href: '/skin-test' },
    { label: 'AI Chat', href: '/ai-chat' },
    { label: 'Products', href: '/products' },
    { label: 'Brands', href: '/brands' },
    { label: 'History', href: '/history' },
    { label: 'Profile', href: '/profile' },
];

export function DashboardSidebar() {
    return (
        <aside className="hidden w-64 border-r border-white/10 bg-slate-950 lg:block">
            <div className="p-6 font-bold text-white text-xl">
                GlowGlam AI
            </div>

            <nav className="flex flex-col gap-2 px-4">
                {links.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className="rounded-xl px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                    >
                        {l.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}