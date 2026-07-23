"use client";

import { Map } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    latitude: number;
    longitude: number;
}

export function OpenInGoogleMapsButton({ latitude, longitude }: Props) {
    function handleClick() {
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
            "_blank",
            "noopener,noreferrer",
        );
    }

    return (
        <Button variant="outline" onClick={handleClick}>
            <Map className="mr-2 h-4 w-4" />
            Google Maps
        </Button>
    );
}
