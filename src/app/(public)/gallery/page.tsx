import { getPublishedGalleryAction } from "@/actions/gallery/get-published-gallery";

import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/dashboard/super-admin/common/SectionHeader";

import { GalleryGrid } from "@/components/public/gallery/GalleryGrid";

export default async function GalleryPage() {
    const result = await getPublishedGalleryAction();
    const data = Array.isArray(result) ? result : (result?.data ?? []);

    if (!data || data.length === 0) {
        return (
            <Container className="py-16">
                <SectionHeader
                    title="Galeri Desa"
                    description="Dokumentasi kegiatan Desa Cintanagara."
                />

                <div className="mt-10 rounded-xl border p-8 text-center text-muted-foreground">
                    Gagal memuat galeri.
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-16">
            <SectionHeader
                title="Galeri Desa"
                description="Dokumentasi kegiatan, pembangunan, pelatihan, UMKM, wisata, dan aktivitas masyarakat Desa Cintanagara."
            />

            <GalleryGrid data={data} />
        </Container>
    );
}
