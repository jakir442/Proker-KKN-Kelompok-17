"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { deleteUserAction } from "@/actions/user/delete-user";
import type { UserListItem } from "@/types/user-list";

import { DeleteDialog } from "@/components/dialogs/DeleteDialog";

interface UserDeleteDialogProps {
    user?: UserListItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDeleteDialog({
    user,
    open,
    onOpenChange,
}: UserDeleteDialogProps) {
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        if (!user) return;

        startTransition(async () => {
            const result = await deleteUserAction(user.id);

            if (result.success) {
                toast.success(result.message);
                onOpenChange(false);
                return;
            }

            toast.error(result.message);
        });
    }

    return (
        <DeleteDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Hapus Pengguna"
            description="Pengguna yang dihapus akan kehilangan akses ke sistem dan tindakan ini tidak dapat dibatalkan."
            itemName={user?.fullName}
            confirmText="Hapus Pengguna"
            isPending={isPending}
            onConfirm={handleDelete}
        />
    );
}