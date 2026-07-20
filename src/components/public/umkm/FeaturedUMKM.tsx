import { Container } from "../layout/Container";
import { SectionHeader } from "../common/SectionHeader";
import { UMKMCard } from "./UMKMCard";

import { getFeaturedUMKMAction } from "@/actions/public/get-featured-umkm";

export async function FeaturedUMKM() {
    const result = await getFeaturedUMKMAction();

    const umkm = result.success ? result.data : [];

    if (umkm.length === 0) {
        return null;
    }

    return (
        <section className="bg-slate-50 py-24">
            <Container>
                <SectionHeader
                    badge="UMKM Desa"
                    title="UMKM Unggulan"
                    description="Temukan berbagai produk unggulan hasil karya masyarakat Desa Cintanagara yang memiliki kualitas terbaik."
                />

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {umkm.map((item) => (
                        <UMKMCard
                            key={item._id.toString()}
                            item={item}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
