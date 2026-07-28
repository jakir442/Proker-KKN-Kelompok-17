"use client";

import { useMemo, useState } from "react";

import type { UserListItem } from "@/types/user-list";

import { UserDialog } from "./UserDialog";
import { UserPagination } from "./UserPagination";
import { UserTable } from "./UserTable";
import { UserDeleteDialog } from "./UserDeleteDialog";
import { UserDetailDrawer } from "./UserDetailDrawer";
import { UserStatusDialog } from "./UserStatusDialog";
import { ResetPasswordDialog } from "./ResetPasswordDialog";
import { UserRole } from "@/constants/roles";

interface UsersClientProps {
    users: UserListItem[];
    search: string;
    role: string;
    status: string;
    page: number;
    totalPages: number;
    currentRole: UserRole;
}

type UserTableItem = Pick<
    UserListItem,
    "id" | "fullName" | "username" | "email" | "role" | "isActive" | "createdAt"
>;

export function UsersClient({
    users,
    search: initialSearch,
    role: initialRole,
    status: initialStatus,
    page,
    totalPages,
    currentRole,
}: UsersClientProps) {
    const [search, setSearch] = useState(initialSearch);
    const [role, setRole] = useState(initialRole);
    const [status, setStatus] = useState(initialStatus);

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");

    const [selectedUser, setSelectedUser] = useState<UserListItem>();
    const [selectedDeleteUser, setSelectedDeleteUser] = useState<UserListItem>();
    const [selectedStatusUser, setSelectedStatusUser] = useState<UserListItem>();
    const [selectedDetailUser, setSelectedDetailUser] = useState<UserListItem>();
    const [selectedResetUser, setSelectedResetUser] = useState<UserListItem>();

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const keyword = search.toLowerCase();

            const matchSearch =
                !search ||
                user.fullName.toLowerCase().includes(keyword) ||
                user.username.toLowerCase().includes(keyword) ||
                user.email.toLowerCase().includes(keyword);

            const matchRole = !role || role === "all" || user.role === role;

            const matchStatus = !status || status === "all" || String(user.isActive) === status;

            return matchSearch && matchRole && matchStatus;
        });
    }, [users, search, role, status]);

    function handleCreate() {
        setMode("create");
        setSelectedUser(undefined);
        setOpen(true);
    }

    function handleEdit(user: UserTableItem) {
        setMode("edit");
        setSelectedUser(user as UserListItem);
        setOpen(true);
    }

    function handleDelete(user: UserListItem) {
        setSelectedDeleteUser(user);
    }

    function handleView(user: UserListItem) {
        setSelectedDetailUser(user);
    }

    function handleToggleStatus(user: UserListItem) {
        setSelectedStatusUser(user);
    }

    function handleResetPassword(user: UserListItem) {
        setSelectedResetUser(user);
    }

    function clearSearch() {
        setSearch("");
    }

    return (
        <>
            <UserTable
                users={filteredUsers}
                search={search}
                role={role}
                status={status}
                onSearchChange={setSearch}
                onRoleChange={setRole}
                onStatusChange={setStatus}
                onSearchClear={clearSearch}
                onCreate={handleCreate}
                onView={handleView}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
                onResetPassword={handleResetPassword}
                onDelete={handleDelete}
            />

            <UserPagination page={page} totalPages={totalPages} />

            <UserDialog
                open={open}
                onOpenChange={setOpen}
                mode={mode}
                user={selectedUser}
                currentRole={currentRole}
            />

            <UserDeleteDialog
                user={selectedDeleteUser}
                open={!!selectedDeleteUser}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedDeleteUser(undefined);
                    }
                }}
            />

            <ResetPasswordDialog
                user={selectedResetUser}
                open={!!selectedResetUser}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedResetUser(undefined);
                    }
                }}
            />

            <UserDetailDrawer
                user={selectedDetailUser}
                open={!!selectedDetailUser}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedDetailUser(undefined);
                    }
                }}
            />

            <UserStatusDialog
                user={selectedStatusUser}
                open={!!selectedStatusUser}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedStatusUser(undefined);
                    }
                }}
            />
        </>
    );
}
