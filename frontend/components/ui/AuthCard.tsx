type AuthCardProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
        <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-pink-500/10 backdrop-blur-xl sm:p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
                <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p>
            </div>

            {children}
        </div>
    );
}