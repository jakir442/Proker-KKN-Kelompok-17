import { ExternalLink, MapPin } from "lucide-react";

interface EventLocationProps {
    location: string;
}

export function EventLocation({ location }: EventLocationProps) {
    const encodedLocation = encodeURIComponent(location);

    const embedSrc = `https://www.google.com/maps?q=${encodedLocation}&z=16&output=embed`;

    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;

    return (
        <section className="overflow-hidden rounded-3xl border bg-background shadow-sm">
            <div className="flex flex-col gap-8 p-6 lg:flex-row lg:items-center lg:justify-between lg:p-8">
                <div className="max-w-xl space-y-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <MapPin className="h-6 w-6" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">Lokasi Kegiatan</h2>

                        <p className="text-base font-medium">{location}</p>

                        <p className="text-sm text-muted-foreground">
                            Gunakan Google Maps untuk melihat lokasi kegiatan dan mendapatkan
                            petunjuk arah secara langsung.
                        </p>
                    </div>

                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        Buka di Google Maps
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>

                <div className="overflow-hidden rounded-2xl border lg:w-[520px]">
                    <iframe
                        title={`Lokasi ${location}`}
                        src={embedSrc}
                        className="h-[320px] w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    );
}
