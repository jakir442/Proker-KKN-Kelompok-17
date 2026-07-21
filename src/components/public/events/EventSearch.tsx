"use client";

import { Search, X } from "lucide-react";

interface EventSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function EventSearch({ value, onChange }: EventSearchProps) {
    return (
        <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Cari agenda, lokasi, atau kegiatan..."
                className="h-12 w-full rounded-2xl border bg-background pl-11 pr-12 text-sm shadow-sm transition-all outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
            />

            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-muted"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}
