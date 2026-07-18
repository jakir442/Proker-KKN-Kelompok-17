import { Badge } from "@/components/ui/badge";
import { ROLES } from "@/constants/roles";

interface RoleBadgeProps {
    role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
    switch (role) {
        case ROLES.SUPER_ADMIN:
            return <Badge variant="destructive">Super Admin</Badge>;
        case ROLES.ADMIN:
            return <Badge className="bg-blue-600 hover:bg-blue-700">Admin Desa</Badge>;
        case ROLES.PETUGAS:
            return <Badge className="bg-amber-500 hover:bg-amber-600">Petugas</Badge>;
        default:
            return <Badge variant="secondary">Warga</Badge>;
    }
}
