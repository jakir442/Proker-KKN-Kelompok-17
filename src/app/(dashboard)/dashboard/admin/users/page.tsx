import { ShieldCheck, UserCog, UserRoundCog, Store, UserCheck, Users } from "lucide-react";
import { getUsersAction } from "@/actions/user/get-users";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { EmptyState } from "@/components/dashboard/super-admin/common/EmptyState";
import { StatCard } from "@/components/dashboard/super-admin/cards/StatCard";
import { UsersClient } from "@/components/dashboard/users/UsersClient";
import { ROLES, type UserRole } from "@/constants/roles";
import { auth } from "@/auth";

interface UsersPageProps {
    searchParams: Promise<{
        search?: string;
        role?: string;
        status?: string;
        page?: string;
        limit?: string;
    }>;
}

export default async function AdminUsersPage({ searchParams }: UsersPageProps) {
    const params = await searchParams;
    const session = await auth();
    if (!session?.user?.role) {
        throw new Error("Unauthorized");
    }

    const currentRole = session.user.role;
    const role =
        params.role && Object.values(ROLES).includes(params.role as UserRole)
            ? (params.role as UserRole)
            : "all";

    const status =
        params.status === "active" || params.status === "inactive" ? params.status : "all";

    const result = await getUsersAction({
        search: params.search,
        role,
        status,
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
    });

    const users = result.success ? result.data : [];

    const totalUsers = result.total ?? 0;
    const currentPage = result.page ?? 1;
    const totalPages = result.totalPages ?? 1;

    const adminCount = users.filter((user) => user.role === ROLES.ADMIN).length;

    const petugasCount = users.filter((user) => user.role === ROLES.PETUGAS).length;

    const umkmCount = users.filter((user) => user.role === ROLES.UMKM).length;

    const activeUserCount = users.filter((user) => user.isActive).length;

    const superAdminCount = users.filter((user) => user.role === ROLES.SUPER_ADMIN).length;

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Manajemen Pengguna"
                description="Kelola akun administrator, petugas, dan UMKM."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <StatCard
                    title="Total User"
                    value={totalUsers}
                    description="Seluruh pengguna"
                    icon={Users}
                    color="emerald"
                />

                <StatCard
                    title="Super Admin"
                    value={superAdminCount}
                    description="Akses penuh sistem"
                    icon={ShieldCheck}
                    color="violet"
                />

                <StatCard
                    title="Admin"
                    value={adminCount}
                    description="Administrator desa"
                    icon={UserCog}
                    color="blue"
                />

                <StatCard
                    title="Petugas"
                    value={petugasCount}
                    description="Petugas operasional"
                    icon={UserRoundCog}
                    color="cyan"
                />

                <StatCard
                    title="UMKM"
                    value={umkmCount}
                    description="Pelaku usaha"
                    icon={Store}
                    color="orange"
                />

                <StatCard
                    title="User Aktif"
                    value={activeUserCount}
                    description="Dapat login"
                    icon={UserCheck}
                    color="emerald"
                />
            </div>

            {users.length === 0 ? (
                <EmptyState
                    title="Belum ada pengguna"
                    description="Belum ada pengguna yang dapat dikelola."
                />
            ) : (
                <UsersClient
                    users={users}
                    search={params.search ?? ""}
                    role={role}
                    status={status}
                    page={currentPage}
                    totalPages={totalPages}
                    currentRole={currentRole}
                />
            )}
        </div>
    );
}
