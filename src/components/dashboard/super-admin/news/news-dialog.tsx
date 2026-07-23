"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { NewsForm } from "./news-form";

export function NewsDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Berita
                    </Button>
                }
            />

            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Tambah Berita</DialogTitle>
                </DialogHeader>

                <NewsForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
