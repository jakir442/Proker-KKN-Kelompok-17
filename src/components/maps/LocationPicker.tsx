"use client";

import dynamic from "next/dynamic";

export interface LocationPickerProps {
    latitude?: number;
    longitude?: number;
    onChange: (latitude: number, longitude: number) => void;
    height?: number;
    disabled?: boolean;
}

const LocationPickerMap = dynamic(
    () =>
        import("./LocationPickerMap").then((mod) => ({
            default: mod.LocationPickerMap,
        })),
    {
        ssr: false,
        loading: () => (
            <div className="flex h-[350px] items-center justify-center rounded-xl border bg-muted/30">
                <p className="text-sm text-muted-foreground">Memuat peta...</p>
            </div>
        ),
    },
);

export function LocationPicker(props: LocationPickerProps) {
    return <LocationPickerMap {...props} />;
}
