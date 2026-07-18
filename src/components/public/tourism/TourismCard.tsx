import Image from "next/image";
import Link from "next/link";

import { ArrowRight, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
        <Card className="group overflow-hidden rounded-2xl border-0 bg-background shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative h-60 overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute left-4 top-4">
                    <Badge>{category}</Badge>
                </div>
            </div>

            <CardContent className="space-y-4 p-6">
                <div>
                    <h3 className="line-clamp-1 text-xl font-semibold">{name}</h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />

                        <span className="line-clamp-1">{location}</span>
                    </div>
                </div>

                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {description}
                </p>

                <Link
                    href={`/tourism/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                    Lihat Detail
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </CardContent>
        </Card>
    );
}
