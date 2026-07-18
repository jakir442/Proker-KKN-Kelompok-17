import { SectionHeader } from "../common/SectionHeader";
import { Container } from "../layout/Container";
import { GalleryGrid } from "./GalleryGrid";

interface GalleryItem {
    id: string;
    title: string;
    image: string;
    album: string;
    takenAt: string;
}

interface GallerySectionProps {
    data: GalleryItem[];
}

export function GallerySection({ data }: GallerySectionProps) {
    return (
        <section className="py-20">
            <Container>
                <SectionHeader
                    badge="Galeri"
                    title="Galeri Desa"
                    description="Dokumentasi kegiatan dan pembangunan Desa Cintanagara"
                />

                <div className="mt-10">
                    <GalleryGrid data={data} />
                </div>
            </Container>
        </section>
    );
}
