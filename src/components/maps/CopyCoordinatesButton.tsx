"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface Props {
    latitude: number;
    longitude: number;
}

export function CopyCoordinatesButton({ latitude, longitude }: Props) {
    async function handleCopy() {
        await navigator.clipboard.writeText(`${latitude}, ${longitude}`);

        toast.success("Koordinat berhasil disalin.");
    }

    return (
        <Button variant="outline" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Koordinat
        </Button>
    );
}
