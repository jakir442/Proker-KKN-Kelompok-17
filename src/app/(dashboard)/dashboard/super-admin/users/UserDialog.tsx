"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { UserListItem } from "@/types/user-list";
import { UserCreateForm } from "./UserCreateForm";
import { UserEditForm } from "./UserEditForm";

interface UserDialogProps {
    mode: "create" | "edit";
    user?: UserListItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDialog({ open, onOpenChange, mode, user }: UserDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{mode === "create" ? "Tambah User" : "Edit User"}</DialogTitle>
                    <DialogDescription>
                        {mode === "create"
                            ? "Tambahkan akun pengguna baru."
                            : "Perbarui informasi pengguna."}
                    </DialogDescription>
                </DialogHeader>

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
            </DialogContent>
        </Dialog>
    );
}
