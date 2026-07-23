"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { TourismColumn } from "./columns";
import { TourismForm } from "./TourismForm";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tourism: TourismColumn;
}

export function EditTourismDialog({ open, onOpenChange, tourism }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Edit Destinasi Wisata</DialogTitle>
                </DialogHeader>

                <TourismForm initialData={tourism && { ...tourism, latitude: tourism.latitude ?? undefined, longitude: tourism.longitude ?? undefined }} onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
