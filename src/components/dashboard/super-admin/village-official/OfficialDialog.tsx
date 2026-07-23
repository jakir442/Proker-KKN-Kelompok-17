"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { OfficialColumn } from "./OfficialColumns";
import { OfficialForm } from "./OfficialForm";

interface OfficialDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    official?: OfficialColumn;
}

export function OfficialDialog({ open, onOpenChange, mode, official }: OfficialDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create" ? "Tambah Pejabat Desa" : "Edit Pejabat Desa"}
                    </DialogTitle>

                    <DialogDescription>
                        {mode === "create"
                            ? "Tambahkan data pejabat desa baru."
                            : "Perbarui data pejabat desa."}
                    </DialogDescription>
                </DialogHeader>

                <OfficialForm
                    initialData={mode === "edit" ? official : undefined}
                    onSuccess={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
