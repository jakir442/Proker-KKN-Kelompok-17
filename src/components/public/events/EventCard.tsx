import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";

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
            className: "bg-sky-500/90 text-white ring-1 ring-white/20 backdrop-blur",
        };
    }

    if (now >= start && now <= end) {
        return {
            label: "Berlangsung",
            className: "bg-emerald-500/90 text-white ring-1 ring-white/20 backdrop-blur",
        };
    }

    return {
        label: "Selesai",
        className: "bg-zinc-900/70 text-white ring-1 ring-white/10 backdrop-blur",
    };
}

export function EventCard({ event }: EventCardProps) {
    const status = getStatus(event.startDate, event.endDate);

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
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-2xl"
        >
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute left-5 top-5">
                    <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
                    >
                        <span className="h-2 w-2 rounded-full bg-current opacity-80" />
                        {status.label}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 gap-4 p-6">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border bg-muted/40">
                    <span className="text-xl font-bold leading-none">{day}</span>

                    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                        {month}
                    </span>
                </div>

                <div className="flex flex-1 flex-col">
                    <h3 className="line-clamp-2 text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                        {event.title}
                    </h3>

                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span>{fullDate}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-primary" />
                            <span>{time} WIB</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className="line-clamp-1">{event.location}</span>
                        </div>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {event.description}
                    </p>

                    <div className="mt-auto pt-6">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                            Lihat Detail
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
