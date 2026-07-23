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
import { EventForm } from "./event-form";
import { EventColumn } from "./event-columns";

interface Props {
    mode?: "create" | "edit";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    event?: EventColumn;
}

export function EventDialog({ mode = "create", open, onOpenChange, event }: Props) {
    const router = useRouter();
    const [createOpen, setCreateOpen] = useState(false);
    const title = mode === "create" ? "Tambah Agenda Desa" : "Edit Agenda Desa";

    const description =
        mode === "create"
            ? "Tambahkan agenda atau kegiatan baru."
            : "Perbarui informasi agenda desa.";

    if (mode === "create") {
        return (
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger
                    render={
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Agenda
                        </Button>
                    }
                />

                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">{description}</p>

                    <EventForm
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

                <EventForm
                    mode="edit"
                    event={event}
                    onSuccess={() => {
                        onOpenChange?.(false);
                        router.refresh();
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
