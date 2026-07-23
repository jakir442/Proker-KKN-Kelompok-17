import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function ResidentsPage() {
    return (
        <ComingSoon
            title="Data Warga"
            description="Modul Data Warga sedang dipersiapkan. Halaman ini nantinya digunakan untuk melihat dan mengelola data penduduk Desa Cintanagara."
            backHref="/dashboard/petugas"
        />
    );
}
