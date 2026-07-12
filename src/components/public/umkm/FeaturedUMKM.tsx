import { Container } from "../layout/Container";
import { SectionHeader } from "../common/SectionHeader";
import { UMKMCard } from "./UMKMCard";

const umkms = [
    {
        id: "1",
        slug: "kopi-cintanagara",
        name: "Kopi Cintanagara",
        image: "/images/umkm-placeholder.jpg",
        category: "Kuliner",
        address: "Dusun Sukamaju",
    },
    {
        id: "2",
        slug: "kerajinan-bambu-lestari",
        name: "Kerajinan Bambu Lestari",
        image: "/images/umkm-placeholder.jpg",
        category: "Kerajinan",
        address: "Dusun Cibodas",
    },
    {
        id: "3",
        slug: "sayuran-organik-makmur",
        name: "Sayuran Organik Makmur",
        image: "/images/umkm-placeholder.jpg",
        category: "Pertanian",
        address: "Dusun Cintajaya",
    },
];

export function FeaturedUMKM() {
    return (
        <section className="bg-slate-50 py-24">
            <Container>
                <SectionHeader
                    badge="UMKM Desa"
                    title="UMKM Unggulan"
                    description="Temukan berbagai produk unggulan hasil karya masyarakat Desa Cintanagara yang memiliki kualitas terbaik."
                />

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {umkms.map((item) => (
                        <UMKMCard key={item.name} item={item} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
