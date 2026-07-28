import { ROLES, type UserRole } from "@/constants/roles";

export type PermissionAction = "view" | "create" | "edit" | "delete";

type Permission = Record<PermissionAction, UserRole[]>;

export const USER_PERMISSIONS: Record<UserRole, Permission> = {
    [ROLES.SUPER_ADMIN]: {
        view: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PETUGAS, ROLES.UMKM],
        create: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PETUGAS, ROLES.UMKM],
        edit: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PETUGAS, ROLES.UMKM],
        delete: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PETUGAS, ROLES.UMKM],
    },

    [ROLES.ADMIN]: {
        view: [ROLES.ADMIN, ROLES.PETUGAS, ROLES.UMKM],
        create: [ROLES.ADMIN, ROLES.PETUGAS, ROLES.UMKM],
        edit: [ROLES.ADMIN, ROLES.PETUGAS, ROLES.UMKM],
        delete: [ROLES.ADMIN, ROLES.PETUGAS, ROLES.UMKM],
    },

    [ROLES.PETUGAS]: {
        view: [],
        create: [],
        edit: [],
        delete: [],
    },

    [ROLES.UMKM]: {
        view: [],
        create: [],
        edit: [],
        delete: [],
    },
};

export function hasUserPermission(actor: UserRole, action: PermissionAction, target: UserRole) {
    return USER_PERMISSIONS[actor][action].includes(target);
}

export function getAllowedUserRoles(actor: UserRole, action: PermissionAction): UserRole[] {
    return USER_PERMISSIONS[actor][action];
}

export function getCreatableUserRoles(actor: UserRole): UserRole[] {
    return USER_PERMISSIONS[actor].create;
}

export function getViewableUserRoles(actor: UserRole): UserRole[] {
    return USER_PERMISSIONS[actor].view;
}

export const canViewUser = (actor: UserRole, target: UserRole) =>
    hasUserPermission(actor, "view", target);

export const canCreateUser = (actor: UserRole, target: UserRole) =>
    hasUserPermission(actor, "create", target);

export const canEditUser = (actor: UserRole, target: UserRole) =>
    hasUserPermission(actor, "edit", target);

export const canDeleteUser = (actor: UserRole, target: UserRole) =>
    hasUserPermission(actor, "delete", target);
