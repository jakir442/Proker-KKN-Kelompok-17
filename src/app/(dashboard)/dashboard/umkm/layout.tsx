import type { ReactNode } from "react";

import { auth } from "@/auth";
import { ROLES } from "@/constants/roles";

import { UMKMLayoutClient } from "./UMKMLayoutClient";

interface Props {
    children: ReactNode;
}

export default async function UMKMLayout({ children }: Props) {
    const session = await auth();

    return (
        <UMKMLayoutClient
            userName={session?.user.name ?? "UMKM"}
            role={session?.user.role ?? ROLES.UMKM}
        >
            {children}
        </UMKMLayoutClient>
    );
}