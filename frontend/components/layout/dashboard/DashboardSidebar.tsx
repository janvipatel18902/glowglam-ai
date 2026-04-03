"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Grid2x2,
  History,
  Package,
  ScanFace,
  Sparkles,
  UserRound,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: Grid2x2 },
  { label: "Skin Test", href: "/skin-test", icon: ScanFace },
  { label: "AI Chat", href: "/ai-chat", icon: Bot },
  { label: "Products", href: "/products", icon: Package },
  { label: "Brands", href: "/brands", icon: Sparkles },
  { label: "History", href: "/history", icon: History },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r border-[#f0e7f3] bg-white lg:block">
      <div className="border-b border-[#f0e7f3] px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-500 text-sm font-bold text-white shadow-md">
            G
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight text-fuchsia-600">
              GlowGlam AI
            </p>
            <p className="text-xs text-slate-500">Personalized skincare</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 px-4 py-5">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive
                  ? "flex items-center gap-3 rounded-2xl bg-[#fdf7fc] px-4 py-3 text-sm font-semibold text-fuchsia-600 shadow-sm transition"
                  : "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-[#fdf7fc] hover:text-slate-900"
              }
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
