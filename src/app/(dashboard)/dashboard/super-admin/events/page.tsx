import { findEvents } from "@/repositories/event.repository";

import { EventDialog } from "@/components/dashboard/super-admin/events/event-dialog";
import { EventTable } from "@/components/dashboard/super-admin/events/event-table";

export default async function DashboardEventsPage() {
    const { events } = await findEvents({
        page: 1,
        limit: 100,
    });

    const data = events.map((event) => ({
        id: event.id,

        title: event.title,
        slug: event.slug,

        description: event.description,

        location: event.location,

        coverImage: event.coverImage,

        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),

        published: event.published,

        createdAt: event.createdAt.toISOString(),
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Agenda Desa</h1>

                    <p className="text-muted-foreground">
                        Kelola agenda dan kegiatan Desa Cintanagara.
                    </p>
                </div>

                <EventDialog mode="create" />
            </div>

            <EventTable data={data} />
        </div>
    );
}
