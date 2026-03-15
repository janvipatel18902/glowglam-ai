import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

export function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-slate-950 text-white">
            <DashboardSidebar />

            <div className="flex flex-1 flex-col">
                <DashboardHeader />

                <main className="flex-1 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.10),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_20%)] p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}