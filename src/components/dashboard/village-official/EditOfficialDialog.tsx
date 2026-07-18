"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { OfficialForm } from "./OfficialForm";
import type { OfficialColumn } from "./OfficialColumns";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    official: OfficialColumn;
}

export function EditOfficialDialog({ open, onOpenChange, official }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Perangkat Desa</DialogTitle>

                    <DialogDescription>Perbarui informasi perangkat desa.</DialogDescription>
                </DialogHeader>

                <OfficialForm initialData={official} onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
