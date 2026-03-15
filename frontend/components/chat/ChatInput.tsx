export function ChatInput() {
    return (
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <textarea
                    placeholder="Ask GlowGlam AI about skincare, routines, products, or your skin analysis..."
                    rows={4}
                    className="min-h-[110px] w-full resize-none rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-pink-400/30"
                />

                <button
                    type="button"
                    className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 sm:self-end"
                >
                    Send
                </button>
            </div>
        </div>
    );
}