import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";
import { AnnouncementDialog } from "@/components/dashboard/super-admin/announcements/announcement-dialog";
import { AnnouncementTable } from "@/components/dashboard/super-admin/announcements/announcement-table";
import { getAnnouncementsAction } from "@/actions/announcements/get-announcements";

export default async function AnnouncementPage() {
    const result = await getAnnouncementsAction({});
    const announcements = result.data.map((announcement) => ({
        ...announcement,
        content: "",
    }));

    return (
        <div className="space-y-8">
            <SectionHeader
                title="Manajemen Pengumuman"
                description="Kelola pengumuman Desa Cintanagara."
            >
                <AnnouncementDialog />
            </SectionHeader>

            <AnnouncementTable data={announcements} />
        </div>
    );
}
