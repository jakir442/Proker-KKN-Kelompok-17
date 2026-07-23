import Image from "next/image";
import Link from "next/link";

import { ArrowRight, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface TourismCardProps {
    id: string;
    slug: string;
    name: string;
    image: string;
    location: string;
    description: string;
    category: string;
}

export function TourismCard({
    slug,
    name,
    image,
    location,
    description,
    category,
}: TourismCardProps) {
    return (
        <Card className="group overflow-hidden rounded-3xl border bg-background/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute left-5 top-5">
                    <Badge className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-white backdrop-blur-md">
                        {category}
                    </Badge>
                </div>
            </div>

            <div className="space-y-5 p-6">
                <div className="space-y-3">
                    <h3 className="line-clamp-1 text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 text-primary" />

                        <span className="line-clamp-1">{location}</span>
                    </div>

                    <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
                        {description}
                    </p>
                </div>

                <Link
                    href={`/wisata/${slug}`}
                    aria-label={`Lihat detail wisata ${name}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    Lihat Detail
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </div>
        </Card>
    );
}
