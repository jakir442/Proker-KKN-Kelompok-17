"use client";

import { deleteGalleryAction } from "@/actions/gallery/delete-gallery";
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

import { useRouter } from "next/navigation";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string;
}

export function DeleteGalleryDialog({ open, onOpenChange, id }: Props) {
    const router = useRouter();

    async function handleDelete() {
        const result = await deleteGalleryAction(id);

        if (!result.success) {
            alert(result.message);
            return;
        }

        onOpenChange(false);

        router.refresh();
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Galeri?</AlertDialogTitle>

                    <AlertDialogDescription>
                        Foto yang sudah dihapus tidak dapat dikembalikan.
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
