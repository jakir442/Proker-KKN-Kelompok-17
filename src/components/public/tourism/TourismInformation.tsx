import { Clock3, MapPin, Phone, Ticket } from "lucide-react";

import { FadeIn } from "@/components/animations/FadeIn";
import { Container } from "@/components/public/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { ITourism } from "@/types/tourism";

interface Props {
    item: ITourism;
}

export function TourismInformation({ item }: Props) {
    const info = [
        {
            icon: MapPin,
            label: "Lokasi",
            value: item.address,
        },
        {
            icon: Clock3,
            label: "Jam Operasional",
            value: item.openingHours || "Belum tersedia",
        },
        {
            icon: Ticket,
            label: "Harga Tiket",
            value:
                item.ticketPrice && item.ticketPrice > 0
                    ? `Rp ${item.ticketPrice.toLocaleString("id-ID")}`
                    : "Gratis",
        },
        {
            icon: Phone,
            label: "Kontak",
            value: item.contact || "-",
        },
    ];

    return (
        <section className="py-20">
            <Container>
                <FadeIn>
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-12 text-center">
                            <Badge className="rounded-full px-4 py-1">Informasi</Badge>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                                Informasi Destinasi
                            </h2>

                            <p className="mt-4 text-muted-foreground">
                                Kenali lebih dekat destinasi wisata yang ada di Desa Cintanagara.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {info.map((itemInfo) => {
                                const Icon = itemInfo.icon;

                                return (
                                    <Card
                                        key={itemInfo.label}
                                        className="rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <CardContent className="flex items-start gap-4 p-6">
                                            <div className="rounded-2xl bg-primary/10 p-3">
                                                <Icon className="h-5 w-5 text-primary" />
                                            </div>

                                            <div>
                                                <p className="text-sm text-muted-foreground">
                                                    {itemInfo.label}
                                                </p>

                                                <p className="mt-1 font-semibold leading-relaxed">
                                                    {itemInfo.value}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        <Card className="mt-8 rounded-3xl">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-semibold">Deskripsi</h3>

                                <div className="prose prose-neutral dark:prose-invert mt-6 max-w-none">
                                    <p className="leading-8 text-muted-foreground whitespace-pre-line">
                                        {item.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </FadeIn>
            </Container>
        </section>
    );
}
