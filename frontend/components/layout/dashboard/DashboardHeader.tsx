export function DashboardHeader() {
    return (
        <header className="border-b border-[#f0e7f3] bg-[#fbf6fb]/90 px-4 py-4 backdrop-blur sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-400">
                        GlowGlam AI
                    </p>
                    <h1 className="mt-1 text-lg font-semibold text-slate-800 sm:text-xl">
                        Dashboard
                    </h1>
                </div>

                <div className="inline-flex items-center rounded-full border border-[#f0e7f3] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                    Welcome, Janvi
                </div>
            </div>
        </header>
    );
}