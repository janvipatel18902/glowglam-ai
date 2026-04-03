"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import { DashboardMainGrid } from "@/components/dashboard/DashboardMainGrid";
import { MotionFade } from "@/components/ui/MotionFade";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <MotionFade>
          <DashboardHero />
        </MotionFade>

        <MotionFade delay={0.08}>
          <DashboardMainGrid />
        </MotionFade>
      </div>
    </ProtectedRoute>
  );
}
