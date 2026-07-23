import type { ReactNode } from "react";
import { auth } from "@/auth";
import { ROLES } from "@/constants/roles";
import { PetugasLayoutClient } from "./PetugasLayoutClient";

interface Props {
    children: ReactNode;
}

export default async function PetugasLayout({ children }: Props) {
    const session = await auth();

    return (
        <PetugasLayoutClient
            userName={session?.user.name ?? "Petugas"}
            role={session?.user.role ?? ROLES.PETUGAS}
        >
            {children}
        </PetugasLayoutClient>
    );
}
