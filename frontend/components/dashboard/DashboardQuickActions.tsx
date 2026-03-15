import Link from 'next/link';

const actions = [
    {
        title: 'Start New Skin Test',
        description: 'Upload a new image and begin your AI skin scan.',
        href: '/skin-test',
    },
    {
        title: 'Chat with AI',
        description: 'Ask GlowGlam AI about routines, products, and skincare tips.',
        href: '/ai-chat',
    },
    {
        title: 'Browse Products',
        description: 'Explore products matched to your beauty goals.',
        href: '/products',
    },
];

export function DashboardQuickActions() {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                    Quick Actions
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                    Continue your beauty journey
                </h2>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {actions.map((action) => (
                    <Link
                        key={action.title}
                        href={action.href}
                        className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-pink-400/20 hover:bg-white/8"
                    >
                        <div className="mb-4 h-10 w-10 rounded-2xl bg-gradient-to-br from-pink-500/20 to-violet-500/20" />
                        <h3 className="text-lg font-semibold text-white">{action.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            {action.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}