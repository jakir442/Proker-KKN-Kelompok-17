import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function GalleryPage() {
    return (
        <ComingSoon
            title="Galeri Desa"
            description="Modul Galeri Desa sedang dikembangkan untuk mengelola dokumentasi foto dan video kegiatan desa."
            backHref="/dashboard/admin"
        />
    );
}
