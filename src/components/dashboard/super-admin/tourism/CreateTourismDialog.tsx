"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { TourismForm } from "./TourismForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateTourismDialog({ open, onOpenChange }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Tambah Destinasi Wisata</DialogTitle>
                </DialogHeader>

                <TourismForm onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
