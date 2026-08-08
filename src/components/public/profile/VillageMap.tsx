import { MapSection } from "@/components/maps/MapSection";

interface Props {
    latitude: number;
    longitude: number;
}

export function VillageMap({ latitude, longitude }: Props) {
    return (
        <section className="space-y-10">
            <MapSection
                name="Desa Cintanagara"
                title="Lokasi Desa Cintanagara"
                description="Lokasi kantor Desa Cintanagara, Kecamatan Cigedug, Kabupaten Garut, Jawa Barat."
                address="Kecamatan Cigedug, Kabupaten Garut, Jawa Barat"
                latitude={latitude}
                longitude={longitude}
                zoom={15}
                footer={
                    <p className="mx-auto max-w-4xl text-center leading-8 text-muted-foreground">
                        Desa Cintanagara terus berkomitmen menjadi desa yang terbuka, inovatif, dan
                        mudah dijangkau. Melalui Smart Village, masyarakat dapat memperoleh
                        informasi resmi sekaligus mengenal lebih dekat potensi serta pelayanan yang
                        tersedia di Desa Cintanagara.
                    </p>
                }
            />
        </section>
    );
}
