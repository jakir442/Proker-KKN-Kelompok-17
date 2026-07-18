"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { APBDesItemForm } from "./APBDesItemForm";
import { APBDesItemTableData } from "@/types/apbdes-item";

interface Props {
    mode?: "create" | "edit";

    open?: boolean;

    onOpenChange?: (open: boolean) => void;

    apbdesId: string;

    item?: APBDesItemTableData;
}

export function APBDesItemDialog({ mode = "create", open, onOpenChange, apbdesId, item }: Props) {
    const [internalOpen, setInternalOpen] = useState(false);

    const dialogOpen = mode === "create" ? internalOpen : (open ?? false);

    const handleOpenChange = (value: boolean) => {
        if (mode === "create") {
            setInternalOpen(value);
        } else {
            onOpenChange?.(value);
        }
    };

    return (
        <>
            {mode === "create" && (
                <Button onClick={() => handleOpenChange(true)}>Tambah Item</Button>
            )}

            <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            {mode === "create" ? "Tambah Item APBDes" : "Edit Item APBDes"}
                        </DialogTitle>

                        <DialogDescription>
                            {mode === "create"
                                ? "Tambahkan rincian anggaran APBDes."
                                : "Perbarui rincian anggaran APBDes."}
                        </DialogDescription>
                    </DialogHeader>

                    <APBDesItemForm
                        mode={mode}
                        apbdesId={apbdesId}
                        item={item}
                        onSuccess={() => handleOpenChange(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
