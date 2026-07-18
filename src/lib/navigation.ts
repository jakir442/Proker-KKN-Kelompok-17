import { navigation } from "@/config/navigation";
import { ROLES } from "@/constants/roles";

export function getNavigation(role: string) {
    return navigation[role] ?? navigation[ROLES.SUPER_ADMIN];
}
