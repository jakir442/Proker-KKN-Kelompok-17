"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { deleteComplaintAction } from "@/actions/complaint/complaint";

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

interface Props {
    id: string;

    open: boolean;

    onOpenChange: (open: boolean) => void;
}

export function DeleteComplaintDialog({ id, open, onOpenChange }: Props) {
    const [isPending, startTransition] = useTransition();

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteComplaintAction(id);

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
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Pengaduan</AlertDialogTitle>

                    <AlertDialogDescription>
                        Pengaduan yang telah dihapus tidak dapat dikembalikan lagi.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isPending}
                        onClick={(e) => {
                            e.preventDefault();

                            handleDelete();
                        }}
                    >
                        {isPending ? "Menghapus..." : "Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
