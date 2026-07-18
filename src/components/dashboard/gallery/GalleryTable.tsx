"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/data-table";

import { columns, GalleryColumn } from "./GalleryColumns";
import { EditGalleryDialog } from "./EditGalleryDialog";
import { DeleteGalleryDialog } from "./DeleteGalleryDialog";
import { toggleGalleryPublishAction } from "@/actions/gallery/toggle-gallery-publish";

interface Props {
    data: GalleryColumn[];
}

export function GalleryTable({ data }: Props) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedGallery, setSelectedGallery] = useState<GalleryColumn | null>(null);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (gallery) => {
                    setSelectedGallery(gallery);
                    setOpen(true);
                },

                onDelete: (gallery) => {
                    setSelectedGallery(gallery);
                    setDeleteOpen(true);
                },

                onPublish: async (gallery) => {
                    const result = await toggleGalleryPublishAction(
                        gallery.id,
                        !gallery.isPublished,
                    );

                    if (!result.success) {
                        alert(result.message);
                        return;
                    }

                    router.refresh();
                },
            }),
        [router],
    );

    return (
        <>
            <DataTable columns={tableColumns} data={data} />

            {selectedGallery && (
                <EditGalleryDialog open={open} onOpenChange={setOpen} gallery={selectedGallery} />
            )}

            {selectedGallery && (
                <DeleteGalleryDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selectedGallery.id}
                />
            )}
        </>
    );
}
