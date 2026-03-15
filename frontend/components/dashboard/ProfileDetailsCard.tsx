const sections = [
    {
        title: 'Account Details',
        items: [
            { label: 'Email', value: 'abc@example.com' },
            { label: 'Member Since', value: 'March 2026' },
            { label: 'Plan', value: 'Free' },
        ],
    },
    {
        title: 'Beauty Preferences',
        items: [
            { label: 'Routine Focus', value: 'Hydration + Glow' },
            { label: 'Sensitive Skin', value: 'Yes' },
            { label: 'Preferred Products', value: 'Serum, Moisturizer, SPF' },
        ],
    },
];

export function ProfileDetailsCard() {
    return (
        <div className="grid gap-6 xl:grid-cols-2">
            {sections.map((section) => (
                <div
                    key={section.title}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>

                    <div className="mt-5 space-y-4">
                        {section.items.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                            >
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                                    {item.label}
                                </p>
                                <p className="mt-2 text-sm font-medium text-white sm:text-base">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}