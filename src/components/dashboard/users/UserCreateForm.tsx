"use client";

import type { UserRole } from "@/constants/roles";

import { UserForm } from "./UserForm";

interface UserCreateFormProps {
    currentRole: UserRole;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UserCreateForm({ currentRole, onSuccess, onCancel }: UserCreateFormProps) {
    return (
        <UserForm
            mode="create"
            currentRole={currentRole}
            onSuccess={onSuccess}
            onCancel={onCancel}
        />
    );
}
