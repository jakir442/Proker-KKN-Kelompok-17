"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/data-table";

import { columns } from "./announcement-columns";
import { AnnouncementTableData } from "@/types/announcement";
import { toggleAnnouncementPublishAction } from "@/actions/announcements/announcements";
import { AnnouncementDialog } from "./announcement-dialog";
import { DeleteAnnouncementDialog } from "./delete-announcement-dialog";

interface Props {
    data: AnnouncementTableData[];
}

export function AnnouncementTable({ data }: Props) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementTableData | null>(
        null,
    );

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (announcement) => {
                    setSelectedAnnouncement(announcement);
                    setOpen(true);
                },

                onDelete: (announcement) => {
                    setSelectedAnnouncement(announcement);
                    setDeleteOpen(true);
                },

                onPublish: async (announcement) => {
                    const result = await toggleAnnouncementPublishAction(
                        announcement.id,
                        !announcement.published,
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

            {selectedAnnouncement && (
                <AnnouncementDialog
                    mode="edit"
                    open={open}
                    onOpenChange={setOpen}
                    announcement={selectedAnnouncement}
                />
            )}

            {selectedAnnouncement && (
                <DeleteAnnouncementDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selectedAnnouncement.id}
                />
            )}
        </>
    );
}
