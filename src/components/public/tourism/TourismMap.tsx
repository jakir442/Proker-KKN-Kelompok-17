import { MapSection } from "@/components/maps/MapSection";
import type { ITourism } from "@/types/tourism";

interface Props {
    item: ITourism;
}

export function TourismMap({ item }: Props) {
    return (
        <MapSection
            badge="Lokasi"
            title="Lokasi Wisata"
            description="Jelajahi lokasi wisata melalui peta interaktif atau gunakan navigasi menuju destinasi."
            name={item.name}
            address={item.address}
            latitude={item.latitude}
            longitude={item.longitude}
        />
    );
}
