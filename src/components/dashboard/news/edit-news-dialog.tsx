"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { NewsForm } from "./news-form";
import { NewsColumn } from "./columns";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    news: NewsColumn;
}

export function EditNewsDialog({ open, onOpenChange, news }: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Edit Berita</DialogTitle>
                </DialogHeader>

                <NewsForm initialData={news} onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    );
}
