import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { Header } from "@/components/layout/header";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <Header />
            <main className="p-6">{children}</main>
        </>
    );
}
