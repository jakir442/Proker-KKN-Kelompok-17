import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AnnouncementCard } from "./AnnouncementCard";

interface Announcement {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    coverImage: string;
    publishedAt: string;
}

interface Props {
    announcements: Announcement[];
}

export function RelatedAnnouncements({ announcements }: Props) {
    if (announcements.length === 0) {
        return null;
    }

    return (
        <section className="mt-24 border-t border-border/60 pt-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        Rekomendasi
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight">Pengumuman Terkait</h2>

                    <p className="mt-3 text-muted-foreground">
                        Informasi lain yang masih berkaitan dan mungkin ingin Anda baca setelah
                        pengumuman ini.
                    </p>
                </div>

                <Link
                    href="/pengumuman"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                    Lihat Semua
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {announcements.map((item) => (
                    <AnnouncementCard
                        key={item.slug}
                        slug={item.slug}
                        title={item.title}
                        excerpt={item.excerpt}
                        category={item.category}
                        coverImage={item.coverImage}
                        publishedAt={item.publishedAt}
                    />
                ))}
            </div>
        </section>
    );
}
