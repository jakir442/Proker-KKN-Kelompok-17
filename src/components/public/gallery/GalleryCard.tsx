"use client";

import Image from "next/image";

interface GalleryCardProps {
    title: string;
    image: string;
    album: string;
    takenAt: string;
    onClick?: () => void;
}

export function GalleryCard({ title, image, album, takenAt, onClick }: GalleryCardProps) {
    const date = new Date(takenAt);

    const formattedDate = Number.isNaN(date.getTime())
        ? "-"
        : new Intl.DateTimeFormat("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
          }).format(date);

    return (
        <button
            type="button"
            onClick={onClick}
            className="group relative overflow-hidden rounded-2xl"
        >
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-xs font-medium text-primary-foreground/80">{album}</p>
                <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-primary-foreground/80">{formattedDate}</p>
            </div>
        </button>
    );
}
