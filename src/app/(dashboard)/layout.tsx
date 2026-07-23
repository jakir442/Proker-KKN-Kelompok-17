import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return children;
}
