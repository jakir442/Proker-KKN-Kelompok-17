import { getGalleryAction } from "@/actions/gallery/get-gallery";

import { SectionHeader } from "@/components/dashboard/common/SectionHeader";
import { GalleryToolbar } from "@/components/dashboard/gallery/GalleryToolbar";
import { GalleryTable } from "@/components/dashboard/gallery/GalleryTable";

export default async function GalleryPage() {
    const result = await getGalleryAction();

    return (
        <div className="space-y-6">
            <SectionHeader
                title="Galeri Desa"
                description="Kelola foto kegiatan dan dokumentasi desa."
            />

            <GalleryToolbar />

            <GalleryTable data={result.data ?? []} />
        </div>
    );
}
