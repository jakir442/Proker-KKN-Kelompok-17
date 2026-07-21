import Image from "next/image";
import { ScrollToTopLink } from "@/components/public/common/ScrollToTopLink";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
        <ScrollToTopLink href={`/pengumuman/${slug}`}>
            <Card className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

                    {/* Floating Badge */}
                    <Badge className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur-md transition-all duration-300 group-hover:scale-105 dark:bg-slate-900/80 dark:text-white">
                        {category}
                    </Badge>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span>{date}</span>
                    </div>
                    <h3 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {title}
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
                        {excerpt}
                    </p>

                    <div className="mt-auto pt-8">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            <span>Baca Selengkapnya</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </div>
                    </div>
                </div>

                {/* Decorative Gradient */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Card>
        </ScrollToTopLink>
    );
}
