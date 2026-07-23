"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { ServiceColumn } from "./ServiceColumns";
import { ServiceForm } from "./ServiceForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    service: ServiceColumn;
}

export function EditServiceDialog({ open, onOpenChange, service }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Edit Layanan Desa</DialogTitle>
                </DialogHeader>

                <ServiceForm initialData={service} onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
