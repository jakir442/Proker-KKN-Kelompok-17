"use server";

import { auth } from "@/auth";
import type { UserRole } from "@/constants/roles";

export async function getCurrentUserRole(): Promise<UserRole> {
    const session = await auth();

    if (!session?.user?.role) {
        throw new Error("Unauthorized");
    }

    return session.user.role;
}
