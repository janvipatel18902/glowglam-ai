const sessions = [
  "Morning skincare routine",
  "Best serum for dry skin",
  "Acne-safe moisturizer",
  "Night routine suggestions",
];

export function ChatSidebar() {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
            AI Chat
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Recent Conversations
          </h2>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10"
        >
          New Chat
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {sessions.map((session) => (
          <button
            key={session}
            type="button"
            className="w-full rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-left text-sm text-slate-300 transition hover:border-pink-400/20 hover:bg-white/8 hover:text-white"
          >
            {session}
          </button>
        ))}
      </div>
    </aside>
  );
}
