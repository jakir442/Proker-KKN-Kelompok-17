import { MapSection } from "@/components/maps/MapSection";
import { Container } from "@/components/public/layout/Container";
import { IUMKM } from "@/types/umkm";

interface Props {
    item: IUMKM;
}

export function UMKMMap({ item }: Props) {
    return (
        <Container>
            <MapSection
                badge="Lokasi"
                title="Temukan Lokasi UMKM"
                description="Datang langsung ke lokasi UMKM atau gunakan navigasi untuk mendapatkan petunjuk arah."
                name={item.name}
                address={item.address}
                latitude={item.latitude}
                longitude={item.longitude}
            />
        </Container>
    );
}
