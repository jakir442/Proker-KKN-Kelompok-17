import { auth } from "@/auth";
import type { ReactNode } from "react";
import { ROLES } from "@/constants/roles";
import { SuperAdminLayoutClient } from "./SuperAdminLayoutClient";

interface Props {
    children: ReactNode;
}

export default async function SuperAdminLayout({ children }: Props) {
    const session = await auth();

    return (
        <SuperAdminLayoutClient
            userName={session?.user.name ?? "Super Admin"}
            role={session?.user.role ?? ROLES.SUPER_ADMIN}
        >
            {children}
        </SuperAdminLayoutClient>
    );
}
