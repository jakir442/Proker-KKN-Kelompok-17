import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function ComplaintPage() {
    return (
        <ComingSoon
            title="Pengaduan Warga"
            description="Modul Pengaduan Warga akan membantu admin menerima, memverifikasi, dan menindaklanjuti laporan masyarakat secara digital."
            backHref="/dashboard/admin"
        />
    );
}
