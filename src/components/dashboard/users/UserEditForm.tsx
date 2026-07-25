"use client";

import type { UserListItem } from "@/types/user-list";

import { UserForm } from "./UserForm";

interface UserEditFormProps {
    user: UserListItem;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UserEditForm({
    user,
    onSuccess,
    onCancel,
}: UserEditFormProps) {
    return (
        <UserForm
            mode="edit"
            user={user}
            onSuccess={onSuccess}
            onCancel={onCancel}
        />
    );
}