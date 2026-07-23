import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { EventDialog } from "@/components/dashboard/super-admin/events/event-dialog";
import { findEvents } from "@/repositories/event.repository";
import { EventTable } from "./event-table";

export default async function EventsPage() {
    const result = await findEvents({});

    const data = result.events.map((item) => ({
        id: item._id.toString(),

        title: item.title,
        slug: item.slug,

        description: item.description,

        coverImage: item.coverImage,

        location: item.location,

        startDate: item.startDate.toISOString(),
        endDate: item.endDate.toISOString(),

        published: item.published,

        createdAt: item.createdAt.toISOString(),
    }));

    return (
        <div className="space-y-8">
            <SectionHeader
                title="Manajemen Agenda Desa"
                description="Kelola agenda dan kegiatan Desa Cintanagara."
            >
                <EventDialog />
            </SectionHeader>

            <EventTable data={data} />
        </div>
    );
}
