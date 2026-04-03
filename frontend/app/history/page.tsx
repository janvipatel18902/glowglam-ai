"use client";

import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Container } from "@/components/layout/container/Container";
import { AnalysisHistoryCard } from "@/components/dashboard/AnalysisHistoryCard";
import { ChatHistoryCard } from "@/components/dashboard/ChatHistoryCard";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen text-slate-800">
        <Navbar />

        <main className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f8edf3_0%,#f4eef8_50%,#edf3fb_100%)]" />

          <Container className="relative py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-[#eadff0] bg-white px-4 py-2 text-xs font-medium text-fuchsia-600">
                Activity History
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-800 sm:text-5xl lg:text-6xl">
                View your beauty journey timeline
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Review your past skin scans and AI beauty conversations in one
                clean, modern history page.
              </p>
            </div>

            <div className="mt-12 grid gap-6 xl:grid-cols-2">
              <AnalysisHistoryCard />
              <ChatHistoryCard />
            </div>
          </Container>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
