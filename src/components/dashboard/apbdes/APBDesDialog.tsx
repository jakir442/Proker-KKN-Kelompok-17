"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { APBDesForm } from "./APBDesForm";
import { APBDesTableData } from "@/types/apbdes";

interface Props {
    mode?: "create" | "edit";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    apbdes?: APBDesTableData;
}

export function APBDesDialog({ mode = "create", open, onOpenChange, apbdes }: Props) {
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
                <Button onClick={() => handleOpenChange(true)}>Tambah APBDes</Button>
            )}

            <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            {mode === "create" ? "Tambah APBDes" : "Edit APBDes"}
                        </DialogTitle>

                        <DialogDescription>
                            {mode === "create"
                                ? "Tambahkan data APBDes baru."
                                : "Perbarui informasi APBDes."}
                        </DialogDescription>
                    </DialogHeader>

                    <APBDesForm
                        mode={mode}
                        apbdes={apbdes}
                        onSuccess={() => handleOpenChange(false)}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
