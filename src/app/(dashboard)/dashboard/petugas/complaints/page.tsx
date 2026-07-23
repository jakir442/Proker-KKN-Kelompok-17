import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function ComplaintPage() {
    return (
        <ComingSoon
            title="Pengaduan Warga"
            description="Modul Pengaduan Warga sedang dikembangkan. Petugas akan dapat menerima, memverifikasi, dan menindaklanjuti setiap laporan masyarakat."
            backHref="/dashboard/petugas"
        />
    );
}
