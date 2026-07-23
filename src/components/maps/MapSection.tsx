import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/public/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapCard } from "./MapCard";

interface Props {
    badge?: string;
    title: string;
    description: string;
    name: string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
    zoom?: number;
    footer?: React.ReactNode;
}

export function MapSection({
    badge = "Lokasi",
    title,
    description,
    name,
    address,
    latitude,
    longitude,
    zoom,
    footer,
}: Props) {
    const googleMapsUrl =
        latitude != null && longitude != null
            ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
            : null;

    return (
        <section className="py-20">
            <Container>
                <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <Badge>{badge}</Badge>
                        <h2 className="mt-5 text-3xl font-bold tracking-tight">{title}</h2>
                        <p className="mt-4 text-muted-foreground">{description}</p>
                    </div>

                    {googleMapsUrl && (
                        <Button>
                            <Link href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                Buka Google Maps
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>

                <MapCard
                    name={name}
                    address={address}
                    latitude={latitude}
                    longitude={longitude}
                    zoom={zoom}
                />
                {footer && <div className="mt-8 rounded-3xl border bg-muted/30 p-6">{footer}</div>}
            </Container>
        </section>
    );
}
