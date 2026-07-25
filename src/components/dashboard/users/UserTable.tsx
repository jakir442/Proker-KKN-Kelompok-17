"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DataTable,
    TableSearch,
    TableToolbar,
    TableToolbarLeft,
    TableToolbarRight,
    TableSelectFilter,
} from "@/components/data-display/table";
import { ShieldCheck, Shield, UserCog, Store, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";
import { UserActions } from "./UserActions";
import { ROLES } from "@/constants/roles";

import type { UserListItem } from "@/types/user-list";

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
    return (
        <DataTable
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
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Dibuat</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.fullName}</TableCell>

                            <TableCell>{user.username}</TableCell>

                            <TableCell>{user.email}</TableCell>

                            <TableCell>
                                <RoleBadge role={user.role} />
                            </TableCell>

                            <TableCell>
                                <StatusBadge isActive={user.isActive} />
                            </TableCell>

                            <TableCell>
                                {new Date(user.createdAt).toLocaleDateString("id-ID")}
                            </TableCell>

                            <TableCell className="text-right">
                                <UserActions
                                    onView={() => onView(user)}
                                    onEdit={() => onEdit(user)}
                                    onToggleStatus={() => onToggleStatus(user)}
                                    onResetPassword={() => onResetPassword(user)}
                                    onDelete={() => onDelete(user)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DataTable>
    );
}
