"use client";

import { Dialog } from "@/components/ui/dialog";

import { FormDialog } from "@/components/forms";

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
            <FormDialog size="4xl">
                <div className="flex h-full min-h-0 flex-col">
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <UMKMForm initialData={umkm} onSuccess={() => onOpenChange(false)} />
                    </div>
                </div>
            </FormDialog>
        </Dialog>
    );
}
