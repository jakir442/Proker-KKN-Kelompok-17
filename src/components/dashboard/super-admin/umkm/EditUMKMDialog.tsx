"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { UMKMColumn } from "./columns";
import { UMKMForm } from "./UMKMForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    umkm: UMKMColumn;
}

export function EditUMKMDialog({ open, onOpenChange, umkm }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Edit UMKM</DialogTitle>
                </DialogHeader>

                <UMKMForm
                    initialData={umkm}
                    onSuccess={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
