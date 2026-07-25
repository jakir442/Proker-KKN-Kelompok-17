import { adminNavigation } from "@/config/navigation-admin";
import { ROLES, type UserRole } from "@/constants/roles";

export function getNavigation(role: UserRole) {
    return adminNavigation[role] ?? adminNavigation[ROLES.SUPER_ADMIN];
}
