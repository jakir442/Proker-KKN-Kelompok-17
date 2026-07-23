"use client";

import { Navigation } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    latitude: number;
    longitude: number;
}

export function RouteButton({ latitude, longitude }: Props) {
    function handleClick() {
        window.open(
            `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    return (
        <Button onClick={handleClick} className="flex-1">
            <Navigation className="mr-2 h-4 w-4" />
            Lihat Rute
        </Button>
    );
}
