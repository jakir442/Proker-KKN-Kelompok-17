import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function ContentPage() {
    return (
        <ComingSoon
            title="Konten Desa"
            description="Modul Konten Desa sedang dalam tahap pengembangan. Nantinya halaman ini digunakan untuk mengelola seluruh konten publik Desa Cintanagara dalam satu tempat."
            backHref="/dashboard/admin"
        />
    );
}
