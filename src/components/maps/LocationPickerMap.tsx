"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import { useEffect, useMemo } from "react";

import L, { type LatLngLiteral } from "leaflet";

import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

import { LocateFixed } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import type { LocationPickerProps } from "./LocationPicker";

const DEFAULT_POSITION: LatLngLiteral = {
    lat: -7.218,
    lng: 107.903,
};

function ClickHandler({
    disabled,
    onChange,
}: {
    disabled?: boolean;
    onChange: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click(e) {
            if (disabled) return;

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

export function LocationPickerMap({
    latitude,
    longitude,
    onChange,
    height = 350,
    disabled = false,
}: LocationPickerProps) {
    const position = useMemo<LatLngLiteral>(() => {
        if (latitude != null && longitude != null && latitude !== 0 && longitude !== 0) {
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
            ({ coords }) => {
                updatePosition(coords.latitude, coords.longitude);
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
                <MapContainer
                    center={position}
                    zoom={16}
                    className="h-full w-full"
                    scrollWheelZoom={!disabled}
                >
                    <ChangeView position={position} />

                    <TileLayer
                        attribution="© OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker
                        position={position}
                        draggable={!disabled}
                        eventHandlers={{
                            dragend(event) {
                                const marker = event.target as L.Marker;

                                const pos = marker.getLatLng();

                                updatePosition(pos.lat, pos.lng);
                            },
                        }}
                    />

                    <ClickHandler disabled={disabled} onChange={updatePosition} />
                </MapContainer>
            </div>

            <Button
                type="button"
                variant="outline"
                disabled={disabled}
                onClick={handleCurrentLocation}
            >
                <LocateFixed className="mr-2 h-4 w-4" />
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
