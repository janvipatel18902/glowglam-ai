//frontend/components/UploadBox.tsx
"use client";

import { useRef, useState } from "react";

type UploadBoxProps = {
  onImageSelect?: (file: File | null) => void;
};

export function UploadBox({ onImageSelect }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (file: File | null) => {
    setFileName(file?.name ?? "");
    onImageSelect?.(file);
  };

  return (
    <div className="rounded-[2rem] border border-dashed border-pink-400/30 bg-white/5 p-6 text-center backdrop-blur-xl sm:p-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/10 text-2xl">
        ✦
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
        Upload Your Skin Image
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-300">
        Upload a clear front-facing image for AI-powered facial skin analysis.
        Make sure your face is visible and the lighting is good.
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
        >
          Choose Image
        </button>

        <button
          type="button"
          className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Use Camera
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
      />

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
        <p className="text-sm text-slate-300">
          {fileName ? `Selected: ${fileName}` : "No image selected yet"}
        </p>
      </div>
    </div>
  );
}
