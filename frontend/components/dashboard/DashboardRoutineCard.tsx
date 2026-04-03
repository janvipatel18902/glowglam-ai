type RoutineItem = {
  step: string;
  title: string;
  subtitle: string;
  time: string;
};

type DashboardRoutineCardProps = {
  title: string;
  icon: string;
  items: RoutineItem[];
  emptyState?: boolean;
};

export function DashboardRoutineCard({
  title,
  icon,
  items,
  emptyState = false,
}: DashboardRoutineCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-[#f0e7f3] bg-white p-5 shadow-[0_10px_30px_rgba(236,72,153,0.08)]">
      <div className="flex items-center gap-2">
        <span className="text-sm">{icon}</span>
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>

      {emptyState ? (
        <div className="mt-5 rounded-2xl border border-[#f3e8f6] bg-[#fcf8fc] p-4">
          <p className="text-sm font-medium text-slate-700">Starter routine</p>
          <p className="mt-1 text-sm text-slate-500">
            Complete your first skin test to unlock a more personalized skincare
            routine.
          </p>
        </div>
      ) : null}

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={`${title}-${item.step}-${item.title}`}
            className="flex items-start gap-3"
          >
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-500 text-xs font-semibold text-white">
              {item.step}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {item.subtitle}
                  </p>
                </div>

                <span className="whitespace-nowrap text-xs text-slate-400">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}