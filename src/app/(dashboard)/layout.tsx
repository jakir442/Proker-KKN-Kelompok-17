import { ReactNode } from "react";

import { Sidebar } from "./dashboard/super-admin/layout/Sidebar";
import { Header } from "./dashboard/super-admin/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import { NavigationItem } from "@/config/navigation";

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-100">
            <Sidebar role={"navigation" as keyof NavigationItem[]} />
            <div className="ml-64 flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 p-6">
                    {children}
                    <Toaster richColors position="top-right" />
                </main>
            </div>
        </div>
    );
}
