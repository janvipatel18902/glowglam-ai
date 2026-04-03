import { Heart } from 'lucide-react';

type DashboardUpdateRoutineCardProps = {
  hasAnalysis?: boolean;
};

export function DashboardUpdateRoutineCard({
  hasAnalysis = false,
}: DashboardUpdateRoutineCardProps) {
  return (
    <div className="rounded-[1.75rem] bg-[#f5bfe9] p-5 shadow-[0_10px_30px_rgba(236,72,153,0.12)]">
      <div className="flex justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-fuchsia-600">
          <Heart className="h-5 w-5" />
        </div>
      </div>

      <h3 className="mt-4 text-center text-xl font-semibold text-slate-800">
        {hasAnalysis ? 'Love your skin!' : 'Start your skin journey'}
      </h3>

      <p className="mt-2 text-center text-sm text-slate-600">
        {hasAnalysis
          ? 'Track your progress and improve your routine over time.'
          : 'Take your first skin test to unlock personalized skincare insights.'}
      </p>

      <button className="mt-5 w-full rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95">
        {hasAnalysis ? 'Update Routine' : 'Take Skin Test'}
      </button>
    </div>
  );
}