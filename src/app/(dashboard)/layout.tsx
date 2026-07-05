import { ReactNode } from "react";

import { Sidebar } from "./dashboard/layout/Sidebar";
import { Header } from "./dashboard/layout/Header";

type DashboardLayoutProps = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-100">
            <Sidebar role="navigation" />
            <div className="ml-64 flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
