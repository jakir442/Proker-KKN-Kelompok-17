"use client";

import { useRouter } from "next/navigation";
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

import { deleteEventAction } from "@/actions/events/events";

interface Props {
    id: string;

    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteEventDialog({ id, open, onOpenChange }: Props) {
    const router = useRouter();

    async function handleDelete() {
        const result = await deleteEventAction(id);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        onOpenChange(false);

        router.refresh();
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Agenda</AlertDialogTitle>

                    <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus agenda ini? Tindakan ini tidak dapat
                        dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>

                    <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
