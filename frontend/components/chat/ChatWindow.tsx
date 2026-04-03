import { ChatInput } from "./ChatInput";

const messages = [
  {
    sender: "ai",
    text: "Hi, I’m GlowGlam AI. I can help with skincare routines, product suggestions, and skin-related questions.",
  },
  {
    sender: "user",
    text: "I have dry and sensitive skin. What kind of routine should I follow?",
  },
  {
    sender: "ai",
    text: "A gentle routine is best. Start with a mild cleanser, hydrating serum, moisturizer with ceramides, and sunscreen during the day.",
  },
];

export function ChatWindow() {
  return (
    <div className="flex h-full min-h-[650px] flex-col rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-xl shadow-pink-500/10 backdrop-blur-xl sm:p-5">
      <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 px-4 py-4">
        <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
          Live Conversation
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          GlowGlam AI Assistant
        </h2>
      </div>

      <div className="mt-4 flex-1 space-y-4 overflow-y-auto rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4">
        {messages.map((message, index) => {
          const isUser = message.sender === "user";

          return (
            <div
              key={`${message.sender}-${index}`}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-[1.5rem] px-4 py-3 text-sm leading-7 sm:max-w-[75%] ${
                  isUser
                    ? "bg-pink-500 text-white"
                    : "border border-white/10 bg-white/5 text-slate-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <ChatInput />
      </div>
    </div>
  );
}
