//frontend/components/SkinTestTips.tsx
const tips = [
  "Use a clear front-facing photo",
  "Avoid dark lighting or blurry images",
  "Remove sunglasses or heavy face coverings",
  "Keep only one face visible in the image",
];

export function SkinTestTips() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
        Best Results
      </p>
      <h3 className="mt-2 text-xl font-semibold text-white">
        Photo Guidelines
      </h3>

      <div className="mt-5 space-y-3">
        {tips.map((tip) => (
          <div
            key={tip}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300"
          >
            {tip}
          </div>
        ))}
      </div>
    </div>
  );
}
