import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function EventPage() {
    return (
        <ComingSoon
            title="Agenda Desa"
            description="Modul Agenda Desa sedang dalam tahap pengembangan. Petugas nantinya dapat melihat jadwal kegiatan, rapat, dan agenda resmi desa."
            backHref="/dashboard/petugas"
        />
    );
}
