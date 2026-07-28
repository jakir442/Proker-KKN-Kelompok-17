"use client";

import { useMemo } from "react";
import { Shield, ShieldCheck, UserCog, Store, CheckCircle2, XCircle } from "lucide-react";

import { ROLES } from "@/constants/roles";
import type { UserListItem } from "@/types/user-list";

import { Button } from "@/components/ui/button";

import {
    DataTable,
    TableSearch,
    TableSelectFilter,
    TableToolbar,
    TableToolbarLeft,
    TableToolbarRight,
} from "@/components/data-display/table";

import { columns } from "./columns";

interface UserTableProps {
    users: UserListItem[];

    search: string;
    role: string;
    status: string;

    onSearchChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSearchClear: () => void;

    onCreate: () => void;

    onView: (user: UserListItem) => void;
    onEdit: (user: UserListItem) => void;
    onToggleStatus: (user: UserListItem) => void;
    onResetPassword: (user: UserListItem) => void;
    onDelete: (user: UserListItem) => void;
}

export function UserTable({
    users,
    search,
    role,
    status,
    onSearchChange,
    onRoleChange,
    onStatusChange,
    onSearchClear,
    onCreate,
    onView,
    onEdit,
    onToggleStatus,
    onResetPassword,
    onDelete,
}: UserTableProps) {
    const tableColumns = useMemo(
        () =>
            columns({
                onView,
                onEdit,
                onToggleStatus,
                onResetPassword,
                onDelete,
            }),
        [onView, onEdit, onToggleStatus, onResetPassword, onDelete],
    );

    return (
        <DataTable
            columns={tableColumns}
            data={users}
            toolbar={
                <TableToolbar>
                    <TableToolbarLeft>
                        <div className="w-full lg:flex-1">
                            <TableSearch
                                value={search}
                                onValueChange={onSearchChange}
                                onClear={onSearchClear}
                                placeholder="Cari pengguna..."
                            />
                        </div>

                        <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto lg:w-fit">
                            <TableSelectFilter
                                value={role}
                                onValueChange={onRoleChange}
                                placeholder="Semua Role"
                                items={[
                                    {
                                        label: "Super Admin",
                                        value: ROLES.SUPER_ADMIN,
                                        icon: ShieldCheck,
                                    },
                                    {
                                        label: "Admin",
                                        value: ROLES.ADMIN,
                                        icon: Shield,
                                    },
                                    {
                                        label: "Petugas",
                                        value: ROLES.PETUGAS,
                                        icon: UserCog,
                                    },
                                    {
                                        label: "UMKM",
                                        value: ROLES.UMKM,
                                        icon: Store,
                                    },
                                ]}
                            />

                            <TableSelectFilter
                                value={status}
                                onValueChange={onStatusChange}
                                placeholder="Semua Status"
                                items={[
                                    {
                                        label: "Aktif",
                                        value: "true",
                                        icon: CheckCircle2,
                                    },
                                    {
                                        label: "Nonaktif",
                                        value: "false",
                                        icon: XCircle,
                                    },
                                ]}
                            />
                        </div>
                    </TableToolbarLeft>

                    <TableToolbarRight>
                        <Button onClick={onCreate} className="w-full lg:w-auto">
                            Tambah Pengguna
                        </Button>
                    </TableToolbarRight>
                </TableToolbar>
            }
        />
    );
}
