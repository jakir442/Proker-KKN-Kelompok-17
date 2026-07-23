import { Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/public/common/SectionHeading";
import { MapSection } from "@/components/maps/MapSection";

interface Props {
    latitude: number;
    longitude: number;
}

export function VillageMap({ latitude, longitude }: Props) {
    return (
        <section className="relative">
            <SectionHeading
                badge="Lokasi Desa"
                title="Temukan Kami"
                highlight="di Desa Cintanagara"
                description="Desa Cintanagara berada di Kecamatan Cigedug, Kabupaten Garut. Lokasi dapat diakses dengan mudah melalui peta interaktif maupun navigasi Google Maps."
                number="06"
                icon={Sparkles}
            />

            <div className="mt-10">
                <MapSection
                    name="Desa Cintanagara"
                    title="Peta Lokasi"
                    description="Lokasi Desa Cintanagara di Kecamatan Cigedug, Kabupaten Garut, Jawa Barat"
                    address="Kecamatan Cigedug, Kabupaten Garut, Jawa Barat"
                    latitude={latitude}
                    longitude={longitude}
                    zoom={15}
                    footer={
                        <p className="mx-auto max-w-4xl text-center leading-8 text-muted-foreground">
                            Desa Cintanagara terus berkomitmen menjadi desa yang terbuka, inovatif,
                            dan mudah dijangkau. Melalui Smart Village, masyarakat dapat memperoleh
                            informasi resmi sekaligus mengenal lebih dekat potensi serta pelayanan
                            yang tersedia di Desa Cintanagara.
                        </p>
                    }
                />
            </div>
        </section>
    );
}
