"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { GalleryDialog } from "./GalleryDialog";

export function GalleryToolbar() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Cari galeri..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Galeri
                </Button>
            </div>

            <GalleryDialog open={open} onOpenChange={setOpen} />
        </>
    );
}
