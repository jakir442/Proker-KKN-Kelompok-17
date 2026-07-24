"use client";

import { Dialog } from "@/components/ui/dialog";
import { UserCreateForm } from "./UserCreateForm";
import { UserEditForm } from "./UserEditForm";

import type { UserListItem } from "@/types/user-list";
import { FormDialog } from "@/components/forms/FormDialog";

interface UserDialogProps {
    mode: "create" | "edit";
    user?: UserListItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDialog({ open, onOpenChange, mode, user }: UserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <FormDialog>
                {mode === "create" ? (
                    <UserCreateForm
                        onSuccess={() => onOpenChange(false)}
                        onCancel={() => onOpenChange(false)}
                    />
                ) : (
                    <UserEditForm
                        user={user!}
                        onSuccess={() => onOpenChange(false)}
                        onCancel={() => onOpenChange(false)}
                    />
                )}
            </FormDialog>
        </Dialog>
    );
}
