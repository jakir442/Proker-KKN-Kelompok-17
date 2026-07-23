import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function AnnouncementPage() {
    return (
        <ComingSoon
            title="Pengumuman Desa"
            description="Modul Pengumuman Desa sedang dalam tahap pengembangan untuk menyampaikan informasi penting kepada masyarakat."
            backHref="/dashboard/admin"
        />
    );
}
