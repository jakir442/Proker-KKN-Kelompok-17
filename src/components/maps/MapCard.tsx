"use client";

import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InteractiveMap } from "./InteractiveMap";
import { RouteButton } from "./RouteButton";
import { OpenInGoogleMapsButton } from "./OpenInGoogleMapsButton";
import { CopyCoordinatesButton } from "./CopyCoordinatesButton";
import { CopyAddressButton } from "./CopyAddressButton";
import { MapEmpty } from "./MapEmpty";

interface MapCardProps {
    name: string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
    zoom?: number;
}

export function MapCard({ name, address, latitude, longitude, zoom }: MapCardProps) {
    if (latitude == null || longitude == null) {
        return <MapEmpty />;
    }

    return (
        <div className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
            {/* Header */}
            <div className="border-b p-6 lg:p-8">
                <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-primary/10 p-3">
                        <MapPin className="h-5 w-5 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <Badge variant="secondary">Lokasi</Badge>
                        <h3 className="mt-3 text-xl font-semibold">{name}</h3>
                        <p className="mt-2 leading-7 text-muted-foreground">{address}</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <RouteButton latitude={latitude} longitude={longitude} />
                    <OpenInGoogleMapsButton latitude={latitude} longitude={longitude} />
                    <CopyAddressButton address={address} />
                    <CopyCoordinatesButton latitude={latitude} longitude={longitude} />
                </div>
            </div>

            {/* Map */}
            <div className="h-[320px] overflow-hidden md:h-[420px] lg:h-[520px]">
                <InteractiveMap
                    latitude={latitude}
                    longitude={longitude}
                    title={name}
                    address={address}
                    zoom={zoom}
                />
            </div>
        </div>
    );
}
