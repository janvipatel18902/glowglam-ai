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

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}