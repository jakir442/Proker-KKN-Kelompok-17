"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GalleryImage {
    id: string;
    title: string;
    image: string;
    album: string;
    takenAt: string;
}

interface GalleryLightboxProps {
    images: GalleryImage[];
    selected: number | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

export function GalleryLightbox({
    images,
    selected,
    onClose,
    onPrev,
    onNext,
}: GalleryLightboxProps) {
    useEffect(() => {
        if (selected === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    onPrev();
                    break;
                case "ArrowRight":
                    onNext();
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [selected, onClose, onPrev, onNext]);

    if (selected === null) return null;

    const current = images[selected];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            onClick={onClose}
        >
            <Button
                variant="secondary"
                size="icon"
                className="absolute right-6 top-6"
                onClick={onClose}
            >
                <X className="h-5 w-5" />
            </Button>

            <Button
                variant="secondary"
                size="icon"
                className="absolute left-6"
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
                variant="secondary"
                size="icon"
                className="absolute right-6 top-1/2 -translate-y-1/2"
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
            >
                <ChevronRight className="h-6 w-6" />
            </Button>

            <div
                className="relative h-[80vh] w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    priority
                    className="object-contain"
                />
            </div>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center">
                <Badge variant="secondary">{current.album}</Badge>

                <h3 className="mt-3 text-2xl font-semibold text-white">{current.title}</h3>

                <p className="mt-2 text-sm text-white/70">
                    {new Intl.DateTimeFormat("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    }).format(new Date(current.takenAt))}
                </p>

                <p className="mt-2 text-xs text-white/60">
                    {selected + 1} / {images.length}
                </p>
            </div>
        </div>
    );
}
