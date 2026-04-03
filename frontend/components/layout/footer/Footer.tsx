import Link from "next/link";

import { Container } from "../container/Container";

export function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-white/70 backdrop-blur-xl">
      <Container className="py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
              GlowGlam AI
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Smart skincare analysis powered by AI.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-slate-800">
              Home
            </Link>
            <Link href="/products" className="transition hover:text-slate-800">
              Products
            </Link>
            <Link href="/brands" className="transition hover:text-slate-800">
              Brands
            </Link>
            <Link href="/ai-chat" className="transition hover:text-slate-800">
              AI Chat
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
