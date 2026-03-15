const chats = [
    'Best routine for dry and sensitive skin',
    'Which serum should I use at night?',
    'How often should I exfoliate?',
];

export function ChatHistoryCard() {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                    AI Chat History
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                    Recent Conversations
                </h2>
            </div>

            <div className="mt-6 space-y-4">
                {chats.map((chat) => (
                    <div
                        key={chat}
                        className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300"
                    >
                        {chat}
                    </div>
                ))}
            </div>
        </div>
    );
}