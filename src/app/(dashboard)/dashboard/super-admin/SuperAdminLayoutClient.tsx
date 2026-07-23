"use client";

import { useState, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

import { Sidebar } from "@/components/dashboard/shared/layout/Sidebar";
import { Header } from "@/components/dashboard/shared/layout/Header";
import { MobileSidebar } from "@/components/dashboard/shared/layout/MobileSidebar";

import type { UserRole } from "@/constants/roles";

interface Props {
    children: ReactNode;
    userName: string;
    role: UserRole;
}

export function SuperAdminLayoutClient({ children, userName, role }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-muted/30">
            <Sidebar role={role} userName={userName} />

            <MobileSidebar
                role={role}
                userName={userName}
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex min-h-screen flex-col md:ml-64">
                <Header onMenuClick={() => setSidebarOpen(true)} userName={userName} role={role} />

                <main className="flex-1 p-4 sm:p-6">{children}</main>
            </div>

            <Toaster richColors position="top-right" />
        </div>
    );
}
