"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { GalleryForm } from "./GalleryForm";
import { GalleryColumn } from "./GalleryColumns";

import type { GalleryInput } from "@/validations/gallery.schema";

interface GalleryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    gallery?: GalleryColumn | null;
}

export function GalleryDialog({ open, onOpenChange, gallery }: GalleryDialogProps) {
    const initialData: (GalleryInput & { id: string }) | undefined = gallery
        ? {
              id: gallery.id,
              title: gallery.title,
              description: gallery.description,
              // narrow album to GalleryInput's album union
              album: gallery.album as GalleryInput["album"],
              image: gallery.image,
              takenAt: new Date(gallery.takenAt),
              isPublished: gallery.isPublished,
          }
        : undefined;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{gallery ? "Edit Galeri" : "Tambah Galeri"}</DialogTitle>
                </DialogHeader>

                <GalleryForm initialData={initialData} onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
