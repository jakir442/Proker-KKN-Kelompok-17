"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

interface Props {
    preview: string;
    onReplace(): void;
    onRemove(): void;
}

export function UploadPreview({
    preview,
    onReplace,
    onRemove,
}: Props) {
    return (
        <div className="overflow-hidden rounded-2xl border">
            <div className="relative aspect-video w-full">
                <Image
                    src={preview}
                    alt=""
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col gap-2 p-4 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onReplace}
                >
                    Ganti
                </Button>

                <Button
                    type="button"
                    variant="destructive"
                    onClick={onRemove}
                >
                    Hapus
                </Button>
            </div>
        </div>
    );
}