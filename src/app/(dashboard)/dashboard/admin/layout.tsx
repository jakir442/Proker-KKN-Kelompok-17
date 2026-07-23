import { auth } from "@/auth";
import { ROLES } from "@/constants/roles";

import { AdminLayoutClient } from "./AdminLayoutClient";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
    const session = await auth();

    return (
        <AdminLayoutClient
            userName={session?.user.name ?? "Admin"}
            role={session?.user.role ?? ROLES.ADMIN}
        >
            {children}
        </AdminLayoutClient>
    );
}
