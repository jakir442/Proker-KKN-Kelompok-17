import { Container } from "../layout/Container";
import { SectionHeader } from "../common/SectionHeader";
import { GalleryCard } from "./GalleryCard";

const gallery = [
    "/images/about-desa.jpg",
    "/images/hero-desa.jpg",
    "/images/about-desa.jpg",
    "/images/hero-desa.jpg",
    "/images/about-desa.jpg",
    "/images/hero-desa.jpg",
];

export function Gallery() {
    return (
        <section className="bg-slate-50 py-24">
            <Container>
                <SectionHeader
                    badge="Galeri"
                    title="Galeri Kegiatan"
                    description="Dokumentasi berbagai kegiatan masyarakat dan pembangunan Desa Cintanagara."
                />

                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {gallery.map((image, index) => (
                        <GalleryCard
                            key={index}
                            item={{ id: String(index + 1), image, title: `Galeri ${index + 1}` }}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
