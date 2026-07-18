import { Container } from "../layout/Container";
import { SectionHeader } from "../common/SectionHeader";
import { TourismCard } from "./TourismCard";

import { findFeaturedTourism } from "@/repositories/tourism.repository";

export async function Tourism() {
    const tourism = await findFeaturedTourism(6);

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
                        <TourismCard
                            key={item._id.toString()}
                            id={item._id.toString()}
                            slug={item.slug}
                            name={item.name}
                            image={item.image}
                            location={item.address}
                            description={item.shortDescription}
                            category={item.category}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
