import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/public/common/SectionHeader";
import { TourismCard } from "@/components/public/tourism/TourismCard";

import { findRelatedTourism } from "@/repositories/tourism.repository";
import type { ITourism } from "@/types/tourism";

interface Props {
    item: ITourism;
}

export async function TourismRelated({ item }: Props) {
    const tourism = await findRelatedTourism(item.slug, item.category, 3);

    if (tourism.length === 0) {
        return null;
    }

    return (
        <section className="py-20">
            <Container>
                <FadeIn>
                    <SectionHeader
                        badge="Rekomendasi"
                        title="Wisata Lainnya"
                        description="Jelajahi destinasi wisata lain yang mungkin menarik untuk Anda kunjungi."
                    />

                    <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {tourism.map((tour) => (
                            <TourismCard
                                key={tour._id.toString()}
                                id={tour._id.toString()}
                                slug={tour.slug}
                                name={tour.name}
                                image={tour.image}
                                location={tour.address}
                                description={tour.shortDescription}
                                category={tour.category}
                            />
                        ))}
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
