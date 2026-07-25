"use client";

import { UserForm } from "./UserForm";

interface UserCreateFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function UserCreateForm({
    onSuccess,
    onCancel,
}: UserCreateFormProps) {
    return (
        <UserForm
            mode="create"
            onSuccess={onSuccess}
            onCancel={onCancel}
        />
    );
}