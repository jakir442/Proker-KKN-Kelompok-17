import {
    Bath,
    Car,
    Coffee,
    Dumbbell,
    Landmark,
    Mountain,
    ParkingCircle,
    ShieldCheck,
    ShoppingBag,
    Tent,
    Toilet,
    Trees,
    UtensilsCrossed,
    Waves,
    Wifi,
} from "lucide-react";

import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/public/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { ITourism } from "@/types/tourism";

interface Props {
    item: ITourism;
}

const facilityIcons: Record<string, typeof Wifi> = {
    parkir: ParkingCircle,
    toilet: Toilet,
    mushola: Landmark,
    masjid: Landmark,
    wifi: Wifi,
    restoran: UtensilsCrossed,
    warung: Coffee,
    cafe: Coffee,
    camping: Tent,
    gazebo: Trees,
    kolam: Waves,
    keamanan: ShieldCheck,
    gym: Dumbbell,
    playground: Mountain,
    taman: Trees,
    belanja: ShoppingBag,
    kendaraan: Car,
};

function getFacilityIcon(name: string) {
    const key = name.toLowerCase();

    const match = Object.entries(facilityIcons).find(([keyword]) => key.includes(keyword));

    return match?.[1] ?? Bath;
}

export function TourismFacilities({ item }: Props) {
    return (
        <section className="py-20">
            <Container>
                <FadeIn>
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <Badge className="rounded-full px-4 py-1">Fasilitas</Badge>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                                Fasilitas yang Tersedia
                            </h2>

                            <p className="mt-4 text-muted-foreground">
                                Berbagai fasilitas telah disediakan untuk memberikan kenyamanan
                                selama berkunjung.
                            </p>
                        </div>

                        {item.facilities.length === 0 ? (
                            <Card className="rounded-3xl border-dashed">
                                <CardContent className="flex flex-col items-center justify-center py-14 text-center">
                                    <Bath className="h-12 w-12 text-muted-foreground/40" />

                                    <h3 className="mt-5 text-lg font-semibold">
                                        Belum Ada Data Fasilitas
                                    </h3>

                                    <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                                        Informasi fasilitas untuk destinasi wisata ini belum
                                        tersedia.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {item.facilities.map((facility) => {
                                    const Icon = getFacilityIcon(facility);

                                    return (
                                        <Card
                                            key={facility}
                                            className="group rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                                        >
                                            <CardContent className="flex flex-col items-center p-8 text-center">
                                                <div className="rounded-2xl bg-primary/10 p-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                                                    <Icon className="h-7 w-7" />
                                                </div>

                                                <h3 className="mt-5 font-semibold">{facility}</h3>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
