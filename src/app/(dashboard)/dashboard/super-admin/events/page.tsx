import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { EventClient } from "@/components/dashboard/super-admin/events/EventClient";
import { findEvents } from "@/repositories/event.repository";

interface Props {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
        status?: string;
    }>;
}

export default async function DashboardEventsPage({ searchParams }: Props) {
    const params = await searchParams;
    const page = Number(params.page ?? 1);
    const limit = Number(params.limit ?? 10);
    const search = params.search ?? "";
    const rawStatus = params.status;
    const status: "all" | "published" | "draft" =
        rawStatus === "published" || rawStatus === "draft" || rawStatus === "all"
            ? rawStatus
            : "all";

    const { events } = await findEvents({
        page,
        limit,
        search,
        status,
    });

    const data = events.map((event) => ({
        id: event.id,

        title: event.title,
        slug: event.slug,

        description: event.description,

        coverImage: event.coverImage,

        location: event.location,
        latitude: event.latitude,
        longitude: event.longitude,

        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),

        organizer: event.organizer,
        contact: event.contact,

        published: event.published,

        createdAt: event.createdAt.toISOString(),
    }));

    return (
        <div className="space-y-8">
            <SectionHeader
                title="Manajemen Agenda Desa"
                description="Kelola agenda dan kegiatan Desa Cintanagara."
            />

            <EventClient events={data} search={search} status={status} />
        </div>
    );
}
