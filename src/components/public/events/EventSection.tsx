import { EventCard } from "./EventCard";

interface Event {
    id: string | number;
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    location: string;
    startDate: string;
    endDate: string;
}

interface EventSectionProps {
    title: string;
    description: string;
    events: Event[];
}

export function EventSection({ title, description, events }: EventSectionProps) {
    if (!events.length) {
        return null;
    }

    return (
        <section className="mt-20">
            <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    <p className="mt-2 text-muted-foreground">{description}</p>
                </div>

                <div className="hidden rounded-full border px-4 py-2 text-sm font-medium text-muted-foreground md:block">
                    {events.length} Agenda
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </section>
    );
}
