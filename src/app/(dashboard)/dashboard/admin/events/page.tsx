import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function EventPage() {
    return (
        <ComingSoon
            title="Agenda Desa"
            description="Modul Agenda Desa akan digunakan untuk mengelola jadwal kegiatan, rapat, dan acara resmi Desa Cintanagara."
            backHref="/dashboard/admin"
        />
    );
}
