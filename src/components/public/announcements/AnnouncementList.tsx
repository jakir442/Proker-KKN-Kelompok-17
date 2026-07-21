import Link from "next/link";
import { BellRing, ArrowLeft } from "lucide-react";

import { AnnouncementCard, AnnouncementCardProps } from "./AnnouncementCard";

interface AnnouncementListProps {
    announcements: AnnouncementCardProps[];
}

export function AnnouncementList({ announcements }: AnnouncementListProps) {
    if (announcements.length === 0) {
        return (
            <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-border/70 bg-gradient-to-b from-muted/30 via-background to-background p-8">
                <div className="mx-auto max-w-md text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <BellRing className="h-10 w-10 text-primary" />
                    </div>

                    <h3 className="mt-8 text-2xl font-bold tracking-tight">Belum Ada Pengumuman</h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        Informasi terbaru, pemberitahuan penting, dan pengumuman resmi dari
                        Pemerintah Desa Cintanagara akan ditampilkan di halaman ini setelah
                        dipublikasikan.
                    </p>

                    <Link
                        href="/"
                        className="group mt-8 inline-flex items-center gap-2 rounded-full border bg-background px-5 py-3 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-md"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Kembali ke Beranda
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.slug} {...announcement} />
            ))}
        </div>
    );
}
