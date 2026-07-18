"use client";

import { useState } from "react";
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

import { deleteAnnouncementAction } from "@/actions/announcements/announcements";

interface DeleteAnnouncementDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string;
}

export function DeleteAnnouncementDialog({
    open,
    onOpenChange,
    id,
}: DeleteAnnouncementDialogProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);

        const result = await deleteAnnouncementAction(id);

        setLoading(false);

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
                    <AlertDialogTitle>Hapus Pengumuman?</AlertDialogTitle>

                    <AlertDialogDescription>
                        Tindakan ini tidak dapat dibatalkan. Pengumuman akan dihapus secara
                        permanen.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                    >
                        {loading ? "Menghapus..." : "Hapus"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
