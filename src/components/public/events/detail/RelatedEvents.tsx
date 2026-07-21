import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { EventCard } from "../EventCard";

interface RelatedEvent {
    id: string;
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    location: string;
    startDate: string;
    endDate: string;
}

interface RelatedEventsProps {
    events: RelatedEvent[];
}

export function RelatedEvents({ events }: RelatedEventsProps) {
    if (events.length === 0) {
        return null;
    }

    return (
        <section className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Agenda Lainnya
                    </h2>

                    <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                        Temukan berbagai kegiatan dan agenda menarik lainnya dari Desa Cintanagara.
                    </p>
                </div>

                <Link
                    href="/agenda"
                    className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-primary
                    "
                >
                    Lihat Semua Agenda
                    <ArrowRight
                        className="
                            h-4
                            w-4
                            transition-transform
                            group-hover:translate-x-1
                        "
                    />
                </Link>
            </div>

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </section>
    );
}
