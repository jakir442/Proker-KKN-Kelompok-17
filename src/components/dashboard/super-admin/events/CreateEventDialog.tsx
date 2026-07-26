"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormDialog } from "@/components/forms";
import { EventForm } from "./event-form";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateEventDialog({ open, onOpenChange }: Props) {
    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <FormDialog size="4xl">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>Tambah Event</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <EventForm
                        mode="create"
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
