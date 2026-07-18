import { getUpcomingEventsAction } from "@/actions/events/get-upcoming-events";
import { getOngoingEventsAction } from "@/actions/events/get-ongoing-events";
import { getCompletedEventsAction } from "@/actions/events/get-completed-events";

import { EventCard } from "@/components/public/events/EventCard";
import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/public/common/SectionHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agenda Desa",

    description: "Informasi agenda dan kegiatan Desa Cintanagara.",
};

export default async function AgendaPage() {
    const [upcoming, ongoing, completed] = await Promise.all([
        getUpcomingEventsAction(6),
        getOngoingEventsAction(),
        getCompletedEventsAction(6),
    ]);

    return (
        <div className="py-20">
            <Container>
                <SectionHeader
                    badge="Agenda Desa"
                    title="Agenda & Kegiatan Desa"
                    description="Lihat seluruh agenda dan kegiatan yang diselenggarakan Pemerintah Desa Cintanagara."
                />

                {upcoming.success && upcoming.data.length > 0 && (
                    <section className="mt-14">
                        <h2 className="mb-6 text-2xl font-bold">Akan Datang</h2>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {upcoming.data.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {ongoing.success && ongoing.data.length > 0 && (
                    <section className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold">Sedang Berlangsung</h2>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {ongoing.data.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {completed.success && completed.data.length > 0 && (
                    <section className="mt-16">
                        <h2 className="mb-6 text-2xl font-bold">Agenda Selesai</h2>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {completed.data.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </section>
                )}

                {!upcoming.data.length && !ongoing.data.length && !completed.data.length && (
                    <div className="py-20 text-center text-muted-foreground">
                        Belum ada agenda yang tersedia.
                    </div>
                )}
            </Container>
        </div>
    );
}
