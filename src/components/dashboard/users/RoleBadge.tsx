import { ShieldCheck, Shield, BriefcaseBusiness, Store } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ROLES } from "@/constants/roles";

interface RoleBadgeProps {
    role: string;
}

export function RoleBadge({ role }: RoleBadgeProps) {
    switch (role) {
        case ROLES.SUPER_ADMIN:
            return (
                <Badge className="gap-1 bg-blue-100 text-blue-700 hover:bg-blue-100">
                    <ShieldCheck className="h-3 w-3" />
                    Super Admin
                </Badge>
            );

        case ROLES.ADMIN:
            return (
                <Badge className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    <Shield className="h-3 w-3" />
                    Admin
                </Badge>
            );

        case ROLES.PETUGAS:
            return (
                <Badge className="gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
                    <BriefcaseBusiness className="h-3 w-3" />
                    Petugas
                </Badge>
            );

        case ROLES.UMKM:
            return (
                <Badge className="gap-1 bg-violet-100 text-violet-700 hover:bg-violet-100">
                    <Store className="h-3 w-3" />
                    UMKM
                </Badge>
            );

        default:
            return <Badge variant="secondary">{role}</Badge>;
    }
}
