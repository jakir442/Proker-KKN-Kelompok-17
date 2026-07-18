import { AnnouncementCard, AnnouncementCardProps } from "./AnnouncementCard";

interface AnnouncementListProps {
    announcements: AnnouncementCardProps[];
}

export function AnnouncementList({ announcements }: AnnouncementListProps) {
    if (announcements.length === 0) {
        return (
            <div className="rounded-xl border border-dashed py-16 text-center">
                <h3 className="text-lg font-semibold">Belum ada pengumuman</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                    Pengumuman akan ditampilkan di sini setelah dipublikasikan.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.slug} {...announcement} />
            ))}
        </div>
    );
}
