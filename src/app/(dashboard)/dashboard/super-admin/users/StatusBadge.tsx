import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    isActive: boolean;
}

export function StatusBadge({ isActive }: StatusBadgeProps) {
    if (isActive) {
        return <Badge className="bg-green-600 hover:bg-green-700">Aktif</Badge>;
    }

    return <Badge variant="destructive">Nonaktif</Badge>;
}
