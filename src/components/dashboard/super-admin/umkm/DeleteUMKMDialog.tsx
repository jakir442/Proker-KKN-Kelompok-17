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

import { deleteUMKMAction } from "@/actions/umkm/delete-umkm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string;
}

export function DeleteUMKMDialog({ open, onOpenChange, id }: Props) {
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteUMKMAction(id);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            onOpenChange(false);
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus UMKM?</AlertDialogTitle>

                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Seluruh data UMKM akan dihapus secara
                        permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Batal</AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isPending ? "Menghapus..." : "Hapus UMKM"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
