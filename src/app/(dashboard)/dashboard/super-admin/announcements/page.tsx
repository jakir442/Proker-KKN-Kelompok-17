import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { AnnouncementClient } from "@/components/dashboard/super-admin/announcements/announcement-client";
import { getAnnouncementsAction } from "@/actions/announcements/get-announcements";

interface Props {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
        category?: string;
        status?: string;
    }>;
}

export default async function AnnouncementPage({ searchParams }: Props) {
    const params = await searchParams;

    const page = Number(params.page ?? 1);
    const limit = Number(params.limit ?? 10);

    const search = params.search ?? "";

    const status: "all" | "published" | "draft" =
        params.status === "published" || params.status === "draft" || params.status === "all"
            ? params.status
            : "all";

    const category:
        | "all"
        | "Umum"
        | "Pelayanan"
        | "Kesehatan"
        | "Pendidikan"
        | "Darurat"
        | "Lainnya" =
        params.category === "Umum" ||
        params.category === "Pelayanan" ||
        params.category === "Kesehatan" ||
        params.category === "Pendidikan" ||
        params.category === "Darurat" ||
        params.category === "Lainnya"
            ? params.category
            : "all";

    const result = await getAnnouncementsAction({
        page,
        limit,
        search,
        category,
        status,
    });

    const announcements = result.data.map((announcement) => ({
        ...announcement,
        content: "",
    }));

    return (
        <div className="space-y-8">
            <SectionHeader
                title="Manajemen Pengumuman"
                description="Kelola pengumuman Desa Cintanagara."
            />

            <AnnouncementClient
                announcements={announcements}
                search={search}
                category={category}
                status={status}
            />
        </div>
    );
}
