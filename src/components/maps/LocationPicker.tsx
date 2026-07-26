"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import type { LatLngLiteral } from "leaflet";
import { LocateFixed } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface LocationPickerProps {
    latitude?: number;
    longitude?: number;

    onChange: (latitude: number, longitude: number) => void;

    height?: number;
}

const DEFAULT_POSITION: LatLngLiteral = {
    lat: -7.218,
    lng: 107.903,
};

function ClickHandler({ onChange }: { onChange: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onChange(e.latlng.lat, e.latlng.lng);
        },
    });

    return null;
}

function ChangeView({ position }: { position: LatLngLiteral }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position, map.getZoom());
    }, [map, position]);

    return null;
}

export function LocationPicker({
    latitude,
    longitude,
    onChange,
    height = 350,
}: LocationPickerProps) {
    const position = useMemo<LatLngLiteral>(() => {
        if (latitude !== undefined && longitude !== undefined) {
            return {
                lat: latitude,
                lng: longitude,
            };
        }

        return DEFAULT_POSITION;
    }, [latitude, longitude]);

    function updatePosition(lat: number, lng: number) {
        onChange(lat, lng);
    }

    function handleCurrentLocation() {
        if (!navigator.geolocation) {
            toast.error("Browser tidak mendukung geolocation.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                updatePosition(pos.coords.latitude, pos.coords.longitude);
            },
            () => {
                toast.error("Gagal mendapatkan lokasi.");
            },
            {
                enableHighAccuracy: true,
            },
        );
    }

    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border" style={{ height }}>
                <MapContainer center={position} zoom={16} className="h-full w-full">
                    <ChangeView position={position} />
                    <TileLayer
                        attribution="© OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                        draggable
                        position={position}
                        eventHandlers={{
                            dragend(e) {
                                const marker = e.target as L.Marker;

                                const pos = marker.getLatLng();

                                updatePosition(pos.lat, pos.lng);
                            },
                        }}
                    />

                    <ClickHandler onChange={updatePosition} />
                </MapContainer>
            </div>

            <Button type="button" variant="outline" onClick={handleCurrentLocation}>
                <LocateFixed className="mr-2 size-4" />
                Gunakan Lokasi Saya
            </Button>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">Latitude</p>

                    <p className="font-mono text-sm">{position.lat.toFixed(6)}</p>
                </div>

                <div className="rounded-lg border bg-muted/30 p-3">
                    <p className="text-xs text-muted-foreground">Longitude</p>

                    <p className="font-mono text-sm">{position.lng.toFixed(6)}</p>
                </div>
            </div>
        </div>
    );
}
