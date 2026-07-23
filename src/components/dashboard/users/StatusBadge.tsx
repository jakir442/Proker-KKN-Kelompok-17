import { CheckCircle2, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    isActive: boolean;
}

export function StatusBadge({ isActive }: StatusBadgeProps) {
    return isActive ? (
        <Badge className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            <CheckCircle2 className="h-3 w-3" />
            Aktif
        </Badge>
    ) : (
        <Badge className="gap-1 bg-rose-100 text-rose-700 hover:bg-rose-100">
            <XCircle className="h-3 w-3" />
            Nonaktif
        </Badge>
    );
}
