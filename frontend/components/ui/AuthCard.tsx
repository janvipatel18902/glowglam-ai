type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full rounded-[2rem] border border-[#eadff0] bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}
