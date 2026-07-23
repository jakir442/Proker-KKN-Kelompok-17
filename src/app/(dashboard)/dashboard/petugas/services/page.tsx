import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function ServicePage() {
    return (
        <ComingSoon
            title="Layanan Surat"
            description="Modul Layanan Surat sedang dalam tahap pengembangan. Nantinya petugas dapat memproses, memverifikasi, dan menyelesaikan permohonan administrasi warga secara digital."
            backHref="/dashboard/petugas"
        />
    );
}
