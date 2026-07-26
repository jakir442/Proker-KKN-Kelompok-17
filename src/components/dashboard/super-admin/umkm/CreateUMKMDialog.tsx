"use client";

import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { FormDialog } from "@/components/forms";
import { UMKMForm } from "./UMKMForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateUMKMDialog({ open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <FormDialog size="4xl">
                <DialogHeader className="border-b px-6 py-5">
                    <DialogTitle>Tambah UMKM</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <UMKMForm onSuccess={() => onOpenChange(false)} />
                </div>
            </FormDialog>
        </Dialog>
    );
}
