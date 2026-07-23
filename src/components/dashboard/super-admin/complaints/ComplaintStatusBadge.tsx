import { Badge } from "@/components/ui/badge";

interface Props {
    status: "PENDING" | "PROCESS" | "DONE" | "REJECTED";
}

export function ComplaintStatusBadge({ status }: Props) {
    switch (status) {
        case "PENDING":
            return <Badge variant="secondary">Pending</Badge>;

        case "PROCESS":
            return <Badge>Diproses</Badge>;

        case "DONE":
            return <Badge className="bg-green-600">Selesai</Badge>;

        case "REJECTED":
            return <Badge variant="destructive">Ditolak</Badge>;

        default:
            return <Badge>-</Badge>;
    }
}
