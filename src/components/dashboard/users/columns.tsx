"use client";

import { ColumnDef } from "@tanstack/react-table";

import { UserActions } from "./UserActions";
import { RoleBadge } from "./RoleBadge";
import { StatusBadge } from "./StatusBadge";

import type { UserListItem } from "@/types/user-list";

interface ColumnProps {
    onView: (user: UserListItem) => void;
    onEdit: (user: UserListItem) => void;
    onToggleStatus: (user: UserListItem) => void;
    onResetPassword: (user: UserListItem) => void;
    onDelete: (user: UserListItem) => void;
}

export function columns({
    onView,
    onEdit,
    onToggleStatus,
    onResetPassword,
    onDelete,
}: ColumnProps): ColumnDef<UserListItem>[] {
    return [
        {
            accessorKey: "fullName",
            header: "Nama",
        },
        {
            accessorKey: "username",
            header: "Username",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => <RoleBadge role={row.original.role} />,
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => <StatusBadge isActive={row.original.isActive} />,
        },
        {
            accessorKey: "createdAt",
            header: "Dibuat",
            cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString("id-ID"),
        },
        {
            id: "actions",
            header: () => <div className="text-right">Aksi</div>,
            cell: ({ row }) => (
                <div className="flex justify-end">
                    <UserActions
                        onView={() => onView(row.original)}
                        onEdit={() => onEdit(row.original)}
                        onToggleStatus={() => onToggleStatus(row.original)}
                        onResetPassword={() => onResetPassword(row.original)}
                        onDelete={() => onDelete(row.original)}
                    />
                </div>
            ),
        },
    ];
}
