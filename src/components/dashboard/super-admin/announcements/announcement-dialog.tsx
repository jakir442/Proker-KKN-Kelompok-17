"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

    const [createOpen, setCreateOpen] = useState(false);

    const title = mode === "create" ? "Tambah Pengumuman" : "Edit Pengumuman";

    const description =
        mode === "create"
            ? "Tambahkan pengumuman baru untuk masyarakat."
            : "Perbarui informasi pengumuman.";

    if (mode === "create") {
        return (
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger
                    render={
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Pengumuman
                        </Button>
                    }
                />

                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">{description}</p>

                    <AnnouncementForm
                        mode="create"
                        onSuccess={() => {
                            setCreateOpen(false);
                            router.refresh();
                        }}
                    />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">{description}</p>

                <AnnouncementForm
                    mode="edit"
                    announcement={announcement}
                    onSuccess={() => {
                        onOpenChange?.(false);
                        router.refresh();
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
