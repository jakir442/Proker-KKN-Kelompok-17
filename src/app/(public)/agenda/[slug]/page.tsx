import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { Container } from "@/components/public/layout/Container";
import { getEventBySlugAction } from "@/actions/events/get-event-by-slug";
import { getRelatedEventsAction } from "@/actions/events/get-related-events";
import { EventCard } from "@/components/public/events/EventCard";

import type { Metadata } from "next";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

interface MetadataProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
    const { slug } = await params;

    const result = await getEventBySlugAction(slug);

    if (!result.success || !result.data) {
        return {
            title: "Agenda Tidak Ditemukan",
        };
    }

    const event = result.data;

    return {
        title: `${event.title} | Agenda Desa Cintanagara`,
        description: event.description.slice(0, 160),

        openGraph: {
            title: event.title,
            description: event.description.slice(0, 160),
            images: [event.coverImage],
        },
    };
}

export default async function EventDetailPage({ params }: Props) {
    const { slug } = await params;
    const result = await getEventBySlugAction(slug);

    if (!result.success || !result.data) {
        notFound();
    }

    const event = result.data;
    const related = await getRelatedEventsAction(event.slug, 3);

    const tanggal = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "full",
    }).format(new Date(event.startDate));

    const jamMulai = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(event.startDate));

    const jamSelesai = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(event.endDate));

    return (
        <Container className="py-20">
            <div className="relative mb-10 aspect-[16/8] overflow-hidden rounded-2xl">
                <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
            </div>

            <h1 className="mb-8 text-4xl font-bold">{event.title}</h1>

            <div className="mb-10 space-y-4 rounded-xl border p-6">
                <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-primary" />

                    <span>{tanggal}</span>
                </div>

                <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-primary" />

                    <span>
                        {jamMulai} - {jamSelesai} WIB
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />

                    <span>{event.location}</span>
                </div>
            </div>

            <article className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-line">
                {event.description}
            </article>

            {related.success && related.data.length > 0 && (
                <section className="mt-20">
                    <h2 className="mb-8 text-3xl font-bold">Agenda Lainnya</h2>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {related.data.map((item) => (
                            <EventCard key={item.id} event={item} />
                        ))}
                    </div>
                </section>
            )}
        </Container>
    );
}
