import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getPublishedEventsAction } from "@/actions/events/get-published-event";

import { SectionHeader } from "../common/SectionHeader";
import { Container } from "../layout/Container";
import { EventCard } from "./EventCard";
import { FeaturedEventCard } from "./FeaturedEventCard";

export async function UpcomingEvents() {
    const result = await getPublishedEventsAction(3);

    if (!result.success || result.data.length === 0) {
        return null;
    }

    const [featuredEvent, ...otherEvents] = result.data;

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background py-24 lg:py-32">
            {/* Decorative Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
            </div>

            <Container>
                <SectionHeader
                    badge="Agenda Desa"
                    title="Agenda & Kegiatan Mendatang"
                    description="Ikuti berbagai agenda, kegiatan, dan acara yang akan diselenggarakan oleh Pemerintah Desa Cintanagara."
                />

                <div className="mt-14 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">Agenda Terdekat</h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Jangan lewatkan kegiatan penting desa yang akan segera berlangsung.
                        </p>
                    </div>

                    <Link
                        href="/agenda"
                        className="group hidden items-center gap-2 text-sm font-semibold text-primary md:flex"
                    >
                        Lihat Semua
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="mt-10 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                    <FeaturedEventCard event={featuredEvent} />

                    <div className="grid gap-6">
                        {otherEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>

                <div className="mt-10 flex justify-center md:hidden">
                    <Link
                        href="/agenda"
                        className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
                    >
                        Lihat Semua Agenda
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
