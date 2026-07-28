"use client";

import type { UserRole } from "@/constants/roles";
import type { UserListItem } from "@/types/user-list";

import { UserForm } from "./UserForm";

interface UserEditFormProps {
    user: UserListItem;
    currentRole: UserRole;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UserEditForm({ user, currentRole, onSuccess, onCancel }: UserEditFormProps) {
    return (
        <UserForm
            mode="edit"
            user={user}
            currentRole={currentRole}
            onSuccess={onSuccess}
            onCancel={onCancel}
        />
    );
}
