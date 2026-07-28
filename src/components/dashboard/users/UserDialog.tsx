"use client";

import type { UserRole } from "@/constants/roles";
import type { UserListItem } from "@/types/user-list";

import { Dialog } from "@/components/ui/dialog";
import { FormDialog } from "@/components/forms/layout/FormDialog";

import { UserCreateForm } from "./UserCreateForm";
import { UserEditForm } from "./UserEditForm";

interface UserDialogProps {
    mode: "create" | "edit";
    user?: UserListItem;
    currentRole: UserRole;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDialog({ open, onOpenChange, mode, user, currentRole }: UserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <FormDialog>
                {mode === "create" ? (
                    <UserCreateForm
                        currentRole={currentRole}
                        onSuccess={() => onOpenChange(false)}
                        onCancel={() => onOpenChange(false)}
                    />
                ) : (
                    <UserEditForm
                        user={user!}
                        currentRole={currentRole}
                        onSuccess={() => onOpenChange(false)}
                        onCancel={() => onOpenChange(false)}
                    />
                )}
            </FormDialog>
        </Dialog>
    );
}
