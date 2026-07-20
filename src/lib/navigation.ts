import { navigation } from "@/config/navigation";
import { ROLES } from "@/constants/roles";

type NavigationItem = typeof navigation extends Array<infer Item> ? Item : typeof navigation[keyof typeof navigation];

export function getNavigation(role: string) {
    const navigationByRole = navigation as unknown as Record<string, NavigationItem>;
    return navigationByRole[role] ?? navigationByRole[ROLES.SUPER_ADMIN];
}
