import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ROLES } from "@/constants/roles";

export default async function DashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    switch (session.user.role) {
        case ROLES.SUPER_ADMIN:
            redirect("/super-admin");

        case ROLES.ADMIN:
            redirect("/dashboard/admin");

        case ROLES.PETUGAS:
            redirect("/dashboard/petugas");

        case ROLES.UMKM:
            redirect("/dashboard/umkm");

        default:
            redirect("/");
    }
}
