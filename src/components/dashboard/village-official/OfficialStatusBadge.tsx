"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
    isActive: boolean;
}

export function OfficialStatusBadge({ isActive }: Props) {
    return (
        <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Aktif" : "Nonaktif"}
        </Badge>
    );
}
