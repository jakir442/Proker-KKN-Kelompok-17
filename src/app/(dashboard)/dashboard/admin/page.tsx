import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { AdminWelcome } from "@/components/dashboard/admin/sections/AdminWelcome";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";

export default async function AdminDashboardPage() {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Dashboard Admin"
                description="Kelola informasi desa, pengguna, layanan, berita, dan konten website Desa Cintanagara."
            />

            <AdminWelcome name={session.user.name ?? "Admin"} />
        </div>
    );
}
