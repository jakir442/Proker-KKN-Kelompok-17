import { getCompletedEventsAction } from "@/actions/events/get-completed-events";
import { getOngoingEventsAction } from "@/actions/events/get-ongoing-events";
import { getUpcomingEventsAction } from "@/actions/events/get-upcoming-events";

import type { Metadata } from "next";

import { SectionHeader } from "@/components/public/common/SectionHeader";
import { EventExplorer } from "@/components/public/events/EventExplorer";
import { EventStats } from "@/components/public/events/EventStats";
import { Container } from "@/components/public/layout/Container";

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

    const upcomingEvents = upcoming.success ? upcoming.data : [];
    const ongoingEvents = ongoing.success ? ongoing.data : [];
    const completedEvents = completed.success ? completed.data : [];

    const total = upcomingEvents.length + ongoingEvents.length + completedEvents.length;

    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background py-24 lg:py-32">
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
            </div>

            <Container>
                <SectionHeader
                    badge="Agenda Desa"
                    title="Agenda & Kegiatan Desa"
                    description="Temukan seluruh agenda, kegiatan, dan acara resmi Pemerintah Desa Cintanagara yang dapat diikuti oleh masyarakat."
                />

                <EventStats
                    upcoming={upcomingEvents.length}
                    ongoing={ongoingEvents.length}
                    completed={completedEvents.length}
                />

                {total > 0 ? (
                    <EventExplorer
                        upcoming={upcomingEvents}
                        ongoing={ongoingEvents}
                        completed={completedEvents}
                    />
                ) : (
                    <div className="mt-24 rounded-3xl border border-dashed bg-background py-20 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl">
                            📅
                        </div>

                        <h3 className="mt-6 text-2xl font-bold">Belum Ada Agenda</h3>

                        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                            Saat ini belum terdapat agenda atau kegiatan yang dipublikasikan oleh
                            Pemerintah Desa Cintanagara.
                        </p>
                    </div>
                )}
            </Container>
        </div>
    );
}
