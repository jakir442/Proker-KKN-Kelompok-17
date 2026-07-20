"use client";

import { ExternalLink, MapPin, Navigation, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/public/common/SectionHeading";

interface Props {
    latitude: number;
    longitude: number;
}

export function VillageMap({ latitude, longitude }: Props) {
    const embed = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    return (
        <section className="relative">
            <SectionHeading
                badge="Lokasi Desa"
                title="Temukan Kami"
                highlight="di Desa Cintanagara"
                description="Desa Cintanagara berada di Kecamatan Cigedug, Kabupaten Garut. Lokasi dapat diakses dengan mudah menggunakan Google Maps."
                number="06"
                icon={Sparkles}
            />

            <div className="mt-10 overflow-hidden rounded-[2rem] border bg-card shadow-sm transition-all duration-300 hover:shadow-xl">
                {/* Header */}
                <div className="grid gap-10 border-b p-8 lg:grid-cols-[360px_1fr] lg:p-10">
                    {/* Left */}
                    <div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/10">
                            <MapPin className="h-8 w-8 text-sky-600 dark:text-sky-400" />
                        </div>
                        <h3 className="mt-6 text-3xl font-bold">Desa Cintanagara</h3>
                        <p className="mt-3 leading-8 text-muted-foreground">
                            Kecamatan Cigedug, Kabupaten Garut, Jawa Barat.
                        </p>

                        <div className="mt-8 space-y-4 rounded-2xl border bg-muted/40 p-5">
                            <div>
                                <p className="text-sm text-muted-foreground">Latitude</p>
                                <p className="font-semibold">{latitude}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Longitude</p>
                                <p className="font-semibold">{longitude}</p>
                            </div>
                        </div>

                        <Button size="lg" className="mt-8 w-full rounded-full">
                            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                                <Navigation className="mr-2 h-4 w-4" />
                                Buka Google Maps
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    </div>

                    {/* Right */}
                    <div className="overflow-hidden rounded-[1.75rem] border">
                        <iframe
                            title="Lokasi Desa Cintanagara"
                            src={embed}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="h-[500px] w-full border-0"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-muted/30 px-8 py-8">
                    <p className="mx-auto max-w-4xl text-center leading-8 text-muted-foreground">
                        Desa Cintanagara terus berkomitmen menjadi desa yang terbuka, inovatif, dan
                        mudah dijangkau. Melalui Smart Village, masyarakat dapat memperoleh
                        informasi resmi sekaligus mengenal lebih dekat potensi serta pelayanan yang
                        tersedia di Desa Cintanagara.
                    </p>
                </div>
            </div>
        </section>
    );
}
