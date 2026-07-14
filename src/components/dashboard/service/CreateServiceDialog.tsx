"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { ServiceForm } from "./ServiceForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateServiceDialog({ open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Tambah Layanan Desa</DialogTitle>
                </DialogHeader>

                <ServiceForm onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
