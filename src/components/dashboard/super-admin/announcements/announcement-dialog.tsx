"use client";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { AnnouncementForm } from "./announcement-form";
import { AnnouncementTableData } from "@/types/announcement";

interface Props {
    mode?: "create" | "edit";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    announcement?: AnnouncementTableData;
}

export function AnnouncementDialog({ mode = "create", open, onOpenChange, announcement }: Props) {
    const router = useRouter();

    const title = mode === "create" ? "Tambah Pengumuman" : "Edit Pengumuman";

    const description =
        mode === "create"
            ? "Tambahkan pengumuman baru untuk masyarakat."
            : "Perbarui informasi pengumuman.";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[calc(100vw-2rem)] flex max-w-5xl max-h-[90vh] p-0 gap-0">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>{title}</DialogTitle>

                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <AnnouncementForm
                        mode={mode}
                        announcement={announcement}
                        onSuccess={() => {
                            onOpenChange?.(false);
                            router.refresh();
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
