"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

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

import { deleteOfficialAction } from "@/actions/village-official/delete-official";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string;
}

export function DeleteOfficialDialog({ open, onOpenChange, id }: Props) {
    const router = useRouter();

    const [pending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteOfficialAction(id);

            if (!result.success) {
                alert(result.message);
                return;
            }

            onOpenChange(false);

            router.refresh();
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Perangkat Desa?</AlertDialogTitle>

                    <AlertDialogDescription>
                        Data yang telah dihapus tidak dapat dikembalikan.
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
