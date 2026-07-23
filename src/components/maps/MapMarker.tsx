"use client";

import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

interface MapMarkerProps {
    latitude: number;
    longitude: number;
    title: string;
    address: string;
}

const markerIcon = L.icon({
    iconUrl: "/images/map/marker.svg",
    iconRetinaUrl: "/images/map/marker.svg",

    iconSize: [36, 48],
    iconAnchor: [18, 48],
    popupAnchor: [0, -42],
});

export function MapMarker({ latitude, longitude, title, address }: MapMarkerProps) {
    return (
        <Marker position={[latitude, longitude]} icon={markerIcon}>
            <Popup>
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold">{title}</h3>

                    <p className="text-xs leading-5 text-muted-foreground">{address}</p>
                </div>
            </Popup>
        </Marker>
    );
}
