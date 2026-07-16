import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Tag } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface AnnouncementCardProps {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    coverImage: string;
    publishedAt: string;
}

export function AnnouncementCard({
    slug,
    title,
    excerpt,
    category,
    coverImage,
    publishedAt,
}: AnnouncementCardProps) {
    const date = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(publishedAt));

    return (
        <Card className="group overflow-hidden transition hover:shadow-lg">
            <Link href={`/pengumuman/${slug}`}>
                <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                    />
                </div>

                <CardContent className="space-y-4 p-5">
                    <div className="flex items-center gap-2">
                        <Badge>{category}</Badge>
                    </div>

                    <h3 className="line-clamp-2 text-lg font-semibold transition group-hover:text-primary">
                        {title}
                    </h3>

                    <p className="line-clamp-3 text-sm text-muted-foreground">{excerpt}</p>

                    <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <CalendarDays className="h-4 w-4" />
                            <span>{date}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            <span>{category}</span>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}
