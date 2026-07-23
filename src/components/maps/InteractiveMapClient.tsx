"use client";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from "react-leaflet";

import { cn } from "@/lib/utils";

import { MapMarker } from "./MapMarker";
import { MapResize } from "./MapResize";

interface Props {
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    zoom?: number;
    className?: string;
}

export function InteractiveMapClient({
    latitude,
    longitude,
    title,
    address,
    zoom = 16,
    className,
}: Props) {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={zoom}
            scrollWheelZoom={true}
            zoomControl={true}
            preferCanvas={true}
            fadeAnimation={false}
            zoomAnimation={false}
            markerZoomAnimation={false}
            attributionControl={false}
            className={cn("h-[520px] w-full", className)}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                tileSize={256}
                zoomOffset={0}
                keepBuffer={4}
                updateWhenIdle
                updateWhenZooming={false}
                noWrap={false}
            />

            <MapResize />

            <MapMarker latitude={latitude} longitude={longitude} title={title} address={address} />
        </MapContainer>
    );
}
