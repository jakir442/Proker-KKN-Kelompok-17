import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";

interface AnnouncementNavigationItem {
    slug: string;
    title: string;
    publishedAt: string;
}

interface Props {
    previous: AnnouncementNavigationItem | null;
    next: AnnouncementNavigationItem | null;
}

function NavigationCard({
    href,
    title,
    date,
    direction,
}: {
    href: string;
    title: string;
    date: string;
    direction: "previous" | "next";
}) {
    return (
        <Link
            href={href}
            scroll
            className="
                group
                flex
                h-full
                flex-col
                rounded-3xl
                border
                border-border/60
                bg-gradient-to-br
                from-background
                to-muted/30
                p-6
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-primary/30
                hover:shadow-xl
            "
        >
            <div
                className={`flex items-center gap-2 text-sm font-medium text-primary ${
                    direction === "next" ? "justify-end" : ""
                }`}
            >
                {direction === "previous" && (
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                )}

                <span>
                    {direction === "previous" ? "Pengumuman Sebelumnya" : "Pengumuman Berikutnya"}
                </span>

                {direction === "next" && (
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
            </div>

            <h3
                className={`mt-5 line-clamp-2 text-lg font-bold leading-relaxed transition-colors group-hover:text-primary ${
                    direction === "next" ? "text-right" : ""
                }`}
            >
                {title}
            </h3>

            <div
                className={`mt-auto flex items-center gap-2 pt-6 text-sm text-muted-foreground ${
                    direction === "next" ? "justify-end" : ""
                }`}
            >
                <CalendarDays className="h-4 w-4" />
                <span>{date}</span>
            </div>
        </Link>
    );
}

export function PreviousNextAnnouncement({ previous, next }: Props) {
    if (!previous && !next) {
        return null;
    }

    return (
        <section className="mt-20">
            <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Lanjutkan Membaca</h2>

                <p className="mt-2 text-muted-foreground">
                    Jelajahi pengumuman resmi lainnya dari Pemerintah Desa Cintanagara.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {previous ? (
                    <NavigationCard
                        href={`/pengumuman/${previous.slug}`}
                        title={previous.title}
                        date={previous.publishedAt}
                        direction="previous"
                    />
                ) : (
                    <div className="hidden md:block" />
                )}

                {next ? (
                    <NavigationCard
                        href={`/pengumuman/${next.slug}`}
                        title={next.title}
                        date={next.publishedAt}
                        direction="next"
                    />
                ) : (
                    <div className="hidden md:block" />
                )}
            </div>
        </section>
    );
}
