import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";

interface EventHeroProps {
    event: {
        title: string;
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
            className: "bg-blue-500/20 text-blue-100 border-blue-300/30",
        };
    }

    if (now >= start && now <= end) {
        return {
            label: "Sedang Berlangsung",
            className: "bg-emerald-500/20 text-emerald-100 border-emerald-300/30",
        };
    }

    return {
        label: "Selesai",
        className: "bg-white/20 text-white border-white/20",
    };
}

export function EventHero({ event }: EventHeroProps) {
    const status = getStatus(event.startDate, event.endDate);

    const tanggal = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(event.startDate));

    return (
        <section className="relative overflow-hidden rounded-3xl">
            <div className="relative aspect-[16/9] lg:aspect-[16/7]">
                <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
                    <div className="max-w-4xl space-y-5">
                        {/* Status */}
                        <span
                            className={`inline-flex rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur ${status.className}`}
                        >
                            {status.label}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
                            {event.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-col gap-3 text-sm text-white/90 sm:flex-row sm:items-center sm:gap-6">
                            <div className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />

                                <span>{tanggal}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />

                                <span>{event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
