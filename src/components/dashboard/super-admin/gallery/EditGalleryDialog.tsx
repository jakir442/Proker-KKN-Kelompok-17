"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { GalleryForm } from "./GalleryForm";
import { GalleryColumn } from "./GalleryColumns";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    gallery: GalleryColumn;
}

export function EditGalleryDialog({ open, onOpenChange, gallery }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Galeri</DialogTitle>
                </DialogHeader>

                <GalleryForm
                    initialData={{
                        id: gallery.id,
                        title: gallery.title,
                        description: gallery.description,
                        album: gallery.album as "Kegiatan" | "Pembangunan" | "Musyawarah" | "Pelatihan" | "Wisata" | "UMKM" | "Lainnya",
                        image: gallery.image,
                        takenAt: new Date(gallery.takenAt),
                        isPublished: gallery.isPublished,
                    }}
                    onSuccess={() => {
                        onOpenChange(false);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
