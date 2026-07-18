import { Users, ShieldCheck, UserCog, User } from "lucide-react";

import { getUsersAction } from "@/actions/user/get-users";

import { SectionHeader } from "../common/SectionHeader";
import { StatCard } from "../cards/StatCard";
import { EmptyState } from "../common/EmptyState";
import { UsersClient } from "./UsersClient";

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

    return (
        <div className="space-y-6">
            <SectionHeader
                title="User Management"
                description="Kelola seluruh akun pengguna dalam sistem."
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total User"
                    value={totalUsers}
                    description="Seluruh pengguna terdaftar"
                    icon={Users}
                />

                <StatCard
                    title="Super Admin"
                    value="-"
                    description="Segera tersedia"
                    icon={ShieldCheck}
                />
                <StatCard title="Admin" value="-" description="Segera tersedia" icon={UserCog} />
                <StatCard title="Warga" value="-" description="Segera tersedia" icon={User} />
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
                    role={params.role ?? "ALL"}
                    status={params.status ?? "ALL"}
                    page={currentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
}
