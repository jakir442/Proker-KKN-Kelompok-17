import { getPublishedServices } from "@/repositories/service.repository";

import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/public/common/SectionHeader";
import { ServiceCard } from "@/components/public/service/ServiceCard";

export default async function ServicesPage() {
    const services = await getPublishedServices();

    return (
        <Container className="py-16">
            <SectionHeader
                badge="Layanan Desa"
                title="Pelayanan Administrasi Desa Cintanagara"
                description="Temukan berbagai layanan administrasi desa dengan informasi persyaratan, estimasi waktu, dan biaya secara lengkap."
            />

            {services.length === 0 ? (
                <div className="rounded-2xl border border-dashed py-16 text-center">
                    <p className="text-muted-foreground">Belum ada layanan yang dipublikasikan.</p>
                </div>
            ) : (
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {services.map((service) => (
                        <ServiceCard
                            key={service._id.toString()}
                            slug={service.slug}
                            title={service.title}
                            description={service.description}
                            duration={service.duration}
                            fee={service.fee}
                            requirements={service.requirements.length}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
}
