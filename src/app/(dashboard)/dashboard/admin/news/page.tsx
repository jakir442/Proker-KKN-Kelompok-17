import { ComingSoon } from "@/components/dashboard/shared/states/ComingSoon";

export default function NewsPage() {
    return (
        <ComingSoon
            title="Berita Desa"
            description="Modul Berita Desa sedang dikembangkan. Admin akan dapat membuat, mengedit, dan mempublikasikan berita terbaru Desa Cintanagara."
            backHref="/dashboard/admin"
        />
    );
}
