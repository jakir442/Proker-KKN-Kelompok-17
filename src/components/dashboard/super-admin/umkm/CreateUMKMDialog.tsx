"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { UMKMForm } from "./UMKMForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateUMKMDialog({ open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Tambah UMKM</DialogTitle>
                </DialogHeader>

                <UMKMForm onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
