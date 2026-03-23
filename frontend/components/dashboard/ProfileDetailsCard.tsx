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
        <div className="grid gap-5 lg:grid-cols-2">
            {sections.map((section) => (
                <div
                    key={section.title}
                    className="rounded-[2rem] border border-[#eadff0] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-6"
                >
                    <h2 className="text-2xl font-semibold text-slate-800">
                        {section.title}
                    </h2>

                    <div className="mt-5 space-y-4">
                        {section.items.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-[#eee6f1] bg-[#fcfbfd] p-4"
                            >
                                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                                    {item.label}
                                </p>

                                <p className="mt-3 text-sm font-medium text-slate-800 sm:text-base">
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