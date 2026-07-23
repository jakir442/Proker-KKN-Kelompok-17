"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface Props {
    address: string;
}

export function CopyAddressButton({ address }: Props) {
    async function handleCopy() {
        await navigator.clipboard.writeText(address);

        toast.success("Alamat berhasil disalin.");
    }

    return (
        <Button variant="outline" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Alamat
        </Button>
    );
}
