import { Container } from "../layout/Container";
import { SectionHeader } from "../common/SectionHeader";
import { TourismCard } from "./TourismCard";

const tourism = [
    {
        name: "Bukit Cintanagara",
        image: "/images/wisata-placeholder.jpg",
        location: "Dusun Sukamaju",
        description:
            "Panorama alam yang indah dengan udara yang sejuk dan cocok untuk menikmati matahari terbit.",
    },
    {
        name: "Curug Alam",
        image: "/images/wisata-placeholder.jpg",
        location: "Dusun Cibodas",
        description:
            "Air terjun alami yang menjadi salah satu destinasi favorit masyarakat sekitar.",
    },
    {
        name: "Perkebunan Teh",
        image: "/images/wisata-placeholder.jpg",
        location: "Dusun Cintajaya",
        description:
            "Hamparan kebun teh hijau yang menawarkan pemandangan pegunungan yang memukau.",
    },
];

export function Tourism() {
    return (
        <section className="py-24">
            <Container>
                <SectionHeader
                    badge="Wisata Desa"
                    title="Destinasi Wisata"
                    description="Nikmati keindahan alam dan berbagai destinasi wisata yang dimiliki Desa Cintanagara."
                />

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {tourism.map((item) => (
                        <TourismCard key={item.name} {...item} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
