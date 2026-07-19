"use client";

import { useState } from "react";

import type { UserListItem } from "@/types/user-list";

import { UserDialog } from "./UserDialog";
import { UserPagination } from "./UserPagination";
import { UserTable } from "./UserTable";
import { UserToolbar } from "./UserToolbar";
import { UserDeleteDialog } from "./UserDeleteDialog";

interface UsersClientProps {
    users: UserListItem[];
    search: string;
    role: string;
    status: string;
    page: number;
    totalPages: number;
}

type UserTableItem = Pick<
    UserListItem,
    "id" | "fullName" | "username" | "email" | "role" | "isActive" | "createdAt"
>;

export function UsersClient({ users, search, role, status, page, totalPages }: UsersClientProps) {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [selectedUser, setSelectedUser] = useState<UserListItem>();
    const [selectedDeleteUser, setSelectedDeleteUser] = useState<UserListItem>();

    function handleCreate() {
        setMode("create");
        setSelectedUser(undefined);
        setOpen(true);
    }

    function handleEdit(user: UserTableItem) {
        setMode("edit");
        setSelectedUser(user as unknown as UserListItem);
        setOpen(true);
    }

    function handleDelete(user: UserListItem) {
        setSelectedDeleteUser(user);
    }

    return (
        <>
            <UserToolbar search={search} role={role} status={status} onCreate={handleCreate} />
            <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
            <UserPagination page={page} totalPages={totalPages} />
            <UserDialog open={open} onOpenChange={setOpen} mode={mode} user={selectedUser} />
            <UserDeleteDialog
                user={selectedDeleteUser}
                open={!!selectedDeleteUser}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedDeleteUser(undefined);
                    }
                }}
            />
        </>
    );
}
