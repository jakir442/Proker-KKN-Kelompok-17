import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";

interface FeaturedEventCardProps {
    event: {
        slug: string;
        title: string;
        description: string;
        coverImage: string;
        location: string;
        startDate: string;
        endDate: string;
    };
}

export function FeaturedEventCard({ event }: FeaturedEventCardProps) {
    const date = new Date(event.startDate);
    const day = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
    }).format(date);
    const month = new Intl.DateTimeFormat("id-ID", {
        month: "short",
    }).format(date);

    const fullDate = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);

    const time = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);

    return (
        <Link
            href={`/agenda/${event.slug}`}
            className="group relative overflow-hidden rounded-3xl border bg-background shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute left-6 top-6 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                    Agenda Utama
                </div>
            </div>

            <div className="space-y-6 p-8">
                <div className="flex gap-5">
                    <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
                        <span className="text-3xl font-bold">{day}</span>

                        <span className="text-sm uppercase tracking-wider">{month}</span>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-3xl font-bold leading-tight transition-colors group-hover:text-primary">
                            {event.title}
                        </h3>

                        <p className="mt-4 line-clamp-3 text-muted-foreground">
                            {event.description}
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-3 rounded-2xl border p-4">
                        <CalendarDays className="h-5 w-5 text-primary" />

                        <div>
                            <p className="text-xs text-muted-foreground">Tanggal</p>

                            <p className="text-sm font-medium">{fullDate}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border p-4">
                        <Clock3 className="h-5 w-5 text-primary" />

                        <div>
                            <p className="text-xs text-muted-foreground">Waktu</p>

                            <p className="text-sm font-medium">{time} WIB</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border p-4">
                        <MapPin className="h-5 w-5 text-primary" />

                        <div>
                            <p className="text-xs text-muted-foreground">Lokasi</p>

                            <p className="line-clamp-1 text-sm font-medium">{event.location}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between border-t pt-6">
                    <span className="text-sm text-muted-foreground">Agenda pilihan minggu ini</span>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        Lihat Detail
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
