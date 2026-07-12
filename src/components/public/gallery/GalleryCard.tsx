import Image from "next/image";

import { Gallery } from "@/types/gallery";

interface GalleryCardProps {
    item: Gallery;
}

export function GalleryCard({ item }: GalleryCardProps) {
    return (
        <div className="group relative aspect-square overflow-hidden rounded-2xl">
            <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
        </div>
    );
}
