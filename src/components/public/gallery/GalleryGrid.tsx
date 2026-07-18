"use client";

import { useState } from "react";

import { GalleryCard } from "./GalleryCard";
import { GalleryLightbox } from "./GalleryLightbox";

interface GalleryItem {
    id: string;
    title: string;
    image: string;
    album: string;
    takenAt: string;
}

interface GalleryGridProps {
    data: GalleryItem[];
}

export function GalleryGrid({ data }: GalleryGridProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const handlePrev = () => {
        if (selected === null) return;

        setSelected((selected - 1 + data.length) % data.length);
    };

    const handleNext = () => {
        if (selected === null) return;

        setSelected((selected + 1) % data.length);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((item, index) => (
                    <GalleryCard key={item.id} {...item} onClick={() => setSelected(index)} />
                ))}
            </div>

            <GalleryLightbox
                images={data}
                selected={selected}
                onClose={() => setSelected(null)}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </>
    );
}
