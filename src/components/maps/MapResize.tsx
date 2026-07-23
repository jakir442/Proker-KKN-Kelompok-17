"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function MapResize() {
    const map = useMap();

    useEffect(() => {
        const resize = () => {
            map.invalidateSize();
        };

        // Setelah render pertama
        const timeout = window.setTimeout(resize, 100);

        // Saat ukuran window berubah
        window.addEventListener("resize", resize);

        return () => {
            window.clearTimeout(timeout);
            window.removeEventListener("resize", resize);
        };
    }, [map]);

    return null;
}
