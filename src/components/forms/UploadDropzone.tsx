"use client";

import { useState } from "react";
import { Upload } from "lucide-react";

import { cn } from "@/lib/utils";

interface Props {
    icon?: React.ElementType;
    disabled?: boolean;
    onClick(): void;
    onDrop(file: File): void;
}

export function UploadDropzone({
    icon: Icon = Upload,
    disabled,
    onClick,
    onDrop,
}: Props) {
    const [dragging, setDragging] = useState(false);

    return (
        <div
            onClick={!disabled ? onClick : undefined}
            onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
                e.preventDefault();
                setDragging(false);

                const file = e.dataTransfer.files[0];

                if (file) {
                    onDrop(file);
                }
            }}
            className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-all duration-200",
                dragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/60 hover:bg-muted/30",
                disabled && "pointer-events-none opacity-60"
            )}
        >
            <div className="mb-4 rounded-2xl bg-primary/10 p-4 text-primary">
                <Icon className="size-7" />
            </div>

            <p className="font-medium">
                Seret gambar ke sini
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
                atau klik untuk memilih file
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
                PNG • JPG • WEBP
            </p>
        </div>
    );
}