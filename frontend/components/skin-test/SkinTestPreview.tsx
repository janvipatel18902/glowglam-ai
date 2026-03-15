type SkinTestPreviewProps = {
    imageUrl?: string | null;
};

export function SkinTestPreview({ imageUrl }: SkinTestPreviewProps) {
    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-xl shadow-pink-500/10 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                        Analysis Preview
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                        Skin Scan Panel
                    </h3>
                </div>

                <span className="rounded-full border border-pink-400/20 bg-pink-400/10 px-3 py-1 text-xs font-medium text-pink-200">
                    AI Ready
                </span>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4">
                <div className="flex min-h-[320px] items-center justify-center rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4">
                    {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={imageUrl}
                            alt="Skin test preview"
                            className="max-h-[280px] rounded-[1.25rem] object-contain"
                        />
                    ) : (
                        <div className="text-center">
                            <div className="mx-auto h-20 w-20 rounded-full border border-pink-300/20 bg-white/5" />
                            <p className="mt-4 text-sm text-slate-300">
                                Your uploaded image preview will appear here
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            Skin Type
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">Pending</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                            Analysis Status
                        </p>
                        <p className="mt-2 text-base font-semibold text-white">
                            Awaiting Upload
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}