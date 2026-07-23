import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { AdminWelcome } from "@/components/dashboard/admin/sections/AdminWelcome";

export default async function AdminDashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="space-y-6">
            <AdminWelcome name={session.user.name ?? "Admin"} />
        </div>
    );
}
