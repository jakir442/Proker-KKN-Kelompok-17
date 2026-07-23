import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function VillageServicePage() {
    return (
        <ComingSoon
            title="Layanan Desa"
            description="Modul Layanan Desa sedang dalam tahap pengembangan. Nantinya halaman ini akan digunakan untuk mengelola seluruh layanan administrasi desa secara digital."
            backHref="/dashboard/admin"
        />
    );
}
