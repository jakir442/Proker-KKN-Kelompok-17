import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { News } from "@/types/news";

interface NewsCardProps {
    news: News;
}

export function NewsCard({ news }: NewsCardProps) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl">
            <Link href={`/berita/${news.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                    <Badge className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur-md">
                        {news.category}
                    </Badge>
                </div>

                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 text-primary" />
                        <span>{news.date}</span>
                    </div>

                    <h3 className="line-clamp-2 text-xl font-bold leading-tight tracking-tight transition-colors duration-300 group-hover:text-primary">
                        {news.title}
                    </h3>

                    <p className="mt-4 line-clamp-3 flex-1 text-sm leading-7 text-muted-foreground">
                        {news.excerpt}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        <span>Baca Selengkapnya</span>

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                </div>
            </Link>
        </article>
    );
}
