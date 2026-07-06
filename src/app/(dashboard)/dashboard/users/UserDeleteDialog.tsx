"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUserAction } from "@/actions/user/delete-user";
import type { UserListItem } from "@/types/user-list";

interface UserDeleteDialogProps {
    user?: UserListItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UserDeleteDialog({ user, open, onOpenChange }: UserDeleteDialogProps) {
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
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus User?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus akun <strong>{user?.fullName}</strong>?
                        <br />
                        Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                        {isPending ? "Menghapus..." : "Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
