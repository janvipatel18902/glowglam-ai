export function DashboardHeader() {
    return (
        <header className="border-b border-white/10 bg-slate-950/90 px-6 py-4 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                        GlowGlam AI
                    </p>
                    <h1 className="mt-1 text-lg font-semibold text-white sm:text-xl">
                        Dashboard
                    </h1>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                    Welcome, Krisi
                </div>
            </div>
        </header>
    );
}