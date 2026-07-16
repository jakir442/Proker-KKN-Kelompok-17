import { getPublishedEventsAction } from "@/actions/events/get-published-event";
import { SectionHeader } from "../common/SectionHeader";
import { Container } from "../layout/Container";
import { EventCard } from "./EventCard";

export async function UpcomingEvents() {
    const result = await getPublishedEventsAction(3);

    if (!result.success || result.data.length === 0) {
        return null;
    }

    return (
        <section className="py-20">
            <Container>
                <SectionHeader
                    badge="Agenda Desa"
                    title="Agenda & Kegiatan Mendatang"
                    description="Ikuti berbagai agenda, kegiatan, dan acara yang akan diselenggarakan oleh Pemerintah Desa Cintanagara."
                />

                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {result.data.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
