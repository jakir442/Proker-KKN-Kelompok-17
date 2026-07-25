import { Users, ShieldCheck, UserCog, UserRoundCog, Store, UserCheck } from "lucide-react";
import { getUsersAction } from "@/actions/user/get-users";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { StatCard } from "@/components/dashboard/super-admin/cards/StatCard";
import { EmptyState } from "@/components/dashboard/super-admin/common/EmptyState";
import { UsersClient } from "@/components/dashboard/users/UsersClient";
import { ROLES } from "@/constants/roles";

interface UsersPageProps {
    searchParams: Promise<{
        search?: string;
        role?: string;
        status?: string;
        page?: string;
        limit?: string;
    }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
    const params = await searchParams;

    const result = await getUsersAction({
        search: params.search,
        role: params.role,
        status: params.status,
        page: Number(params.page) || 1,
        limit: Number(params.limit) || 10,
    });

    const users = result.success ? result.data : [];
    const totalUsers = result.total;
    const currentPage = result.page ?? 1;
    const totalPages = result.totalPages ?? 1;
    const superAdminCount = users.filter((user) => user.role === ROLES.SUPER_ADMIN).length;
    const adminCount = users.filter((user) => user.role === ROLES.ADMIN).length;
    const petugasCount = users.filter((user) => user.role === ROLES.PETUGAS).length;
    const umkmCount = users.filter((user) => user.role === ROLES.UMKM).length;
    const activeUserCount = users.filter((user) => user.isActive).length;

    return (
        <div className="space-y-6">
            <SectionHeader
                title="User Management"
                description="Kelola seluruh akun pengguna dalam sistem."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <StatCard
                    title="Total User"
                    value={totalUsers}
                    description="Seluruh pengguna terdaftar"
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
                    description="Pengelola sistem desa"
                    icon={UserCog}
                    color="blue"
                />

                <StatCard
                    title="Petugas"
                    value={petugasCount}
                    description="Petugas operasional desa"
                    icon={UserRoundCog}
                    color="cyan"
                />

                <StatCard
                    title="UMKM"
                    value={umkmCount}
                    description="Pengelola usaha desa"
                    icon={Store}
                    color="orange"
                />

                <StatCard
                    title="User Aktif"
                    value={activeUserCount}
                    description="Akun yang dapat login"
                    icon={UserCheck}
                    color="emerald"
                />
            </div>

            {users.length === 0 ? (
                <EmptyState
                    title="Belum ada pengguna"
                    description="Data pengguna akan muncul di sini."
                />
            ) : (
                <UsersClient
                    users={users}
                    search={params.search ?? ""}
                    role={params.role ?? "all"}
                    status={params.status ?? "all"}
                    page={currentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
}
