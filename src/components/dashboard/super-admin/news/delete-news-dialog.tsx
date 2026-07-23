"use client";

import { useTransition } from "react";

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

import { deleteNewsAction } from "@/actions/news";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string;
}

export function DeleteNewsDialog({ open, onOpenChange, id }: Props) {
    const [pending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteNewsAction(id);

            if (!result.success) {
                alert(result.message);
                return;
            }

            onOpenChange(false);
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Berita?</AlertDialogTitle>

                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Berita akan dihapus permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>

                    <AlertDialogAction onClick={handleDelete} disabled={pending}>
                        {pending ? "Menghapus..." : "Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
