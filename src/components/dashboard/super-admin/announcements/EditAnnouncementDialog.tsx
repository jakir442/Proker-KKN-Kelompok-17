"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { FormDialog } from "@/components/forms";

import { AnnouncementForm } from "./announcement-form";

import type { AnnouncementTableData } from "@/types/announcement";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    announcement: AnnouncementTableData;
}

export function EditAnnouncementDialog({ open, onOpenChange, announcement }: Props) {
    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <FormDialog size="4xl">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>Edit Pengumuman</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <AnnouncementForm
                        mode="edit"
                        announcement={announcement}
                        onSuccess={() => {
                            onOpenChange(false);
                            router.refresh();
                        }}
                    />
                </div>
            </FormDialog>
        </Dialog>
    );
}
