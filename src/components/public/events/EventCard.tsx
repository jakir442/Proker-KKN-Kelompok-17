import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

interface EventCardProps {
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

function getStatus(startDate: string, endDate: string) {
    const now = new Date();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
        return {
            label: "Akan Datang",
            className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        };
    }

    if (now >= start && now <= end) {
        return {
            label: "Berlangsung",
            className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        };
    }

    return {
        label: "Selesai",
        className: "bg-muted text-muted-foreground",
    };
}

export function EventCard({ event }: EventCardProps) {
    const status = getStatus(event.startDate, event.endDate);

    const tanggal = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(event.startDate));

    const jam = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(event.startDate));

    return (
        <Link
            href={`/agenda/${event.slug}`}
            className="group overflow-hidden rounded-xl border bg-background transition hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                    >
                        {status.label}
                    </span>
                </div>
            </div>

            <div className="space-y-4 p-5">
                <h3 className="line-clamp-2 text-lg font-bold">{event.title}</h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>{tanggal}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4" />
                        <span>{jam} WIB</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                    </div>
                </div>

                <p className="line-clamp-3 text-sm text-muted-foreground">{event.description}</p>

                <span className="inline-flex text-sm font-medium text-primary">Lihat Detail →</span>
            </div>
        </Link>
    );
}
