"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewsSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function NewsSearch({ value, onChange }: NewsSearchProps) {
    return (
        <div className="mx-auto w-full max-w-2xl">
            <div className="group relative">
                <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Cari berita berdasarkan judul atau kata kunci..."
                    className="h-14 rounded-full border-border/60 bg-background pl-14 pr-14 text-base shadow-sm transition-all duration-300 placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10"
                />

                {value && (
                    <button
                        type="button"
                        aria-label="Hapus pencarian"
                        onClick={() => onChange("")}
                        className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
