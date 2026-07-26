"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { FormDialog } from "@/components/forms";

import { EventForm } from "./event-form";

import type { EventColumn } from "./event-columns";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: EventColumn;
}

export function EditEventDialog({ open, onOpenChange, event }: Props) {
    const router = useRouter();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <FormDialog size="4xl">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>Edit Event</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <EventForm
                        mode="edit"
                        event={event}
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
