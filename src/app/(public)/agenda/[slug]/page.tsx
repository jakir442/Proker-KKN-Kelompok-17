import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Home } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/public/layout/Container";
import { getEventBySlugAction } from "@/actions/events/get-event-by-slug";
import { getRelatedEventsAction } from "@/actions/events/get-related-events";
import { EventHero } from "@/components/public/events/detail/EventHero";
import { EventInfo } from "@/components/public/events/detail/EventInfo";
import { EventContent } from "@/components/public/events/detail/EventContent";
import { ShareEvent } from "@/components/public/events/detail/ShareEvent";
import { RelatedEvents } from "@/components/public/events/detail/RelatedEvents";
import { EventLocation } from "@/components/public/events/detail/EventLocation";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
            images: [
                {
                    url: event.coverImage,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
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
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.title,
        description: event.description,
        image: [event.coverImage],
        location: {
            "@type": "Place",
            name: event.location,
        },
        startDate: event.startDate,
        endDate: event.endDate,
    };

    return (
        <Container className="py-10 lg:py-16">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="inline-flex items-center gap-1 hover:text-primary">
                    <Home className="h-4 w-4" />
                    Beranda
                </Link>
                <span>/</span>
                <Link href="/agenda" className="hover:text-primary">
                    Agenda
                </Link>
                <span>/</span>
                <span className="line-clamp-1">{event.title}</span>
            </nav>

            <div className="space-y-14">
                <EventHero event={event} />
                <EventInfo event={event} />
                <EventContent description={event.description} />
                <EventLocation location={event.location} />
                <ShareEvent title={event.title} />
                {related.success && related.data.length > 0 && (
                    <RelatedEvents events={related.data} />
                )}
            </div>
        </Container>
    );
}
