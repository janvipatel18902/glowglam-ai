"use client";

import { useEffect, useState } from "react";
import { getAuthUser, type AuthUser } from "@/lib/auth";

export function DashboardHeader() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getAuthUser());
  }, []);

  const firstName =
    user?.fullName?.trim()?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "User";

  return (
    <header className="border-b border-[#ecdff1] bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-400">
            GlowGlam AI
          </p>
          <h1 className="mt-1 text-lg font-semibold text-slate-800 sm:text-xl">
            Dashboard
          </h1>
        </div>

        <div className="inline-flex items-center rounded-full border border-[#ecdff1] bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
          Welcome, {firstName}
        </div>
      </div>
    </header>
  );
}
