export const ROLES = {
    SUPER_ADMIN: "super_admin",
    ADMIN: "admin",
    PETUGAS: "petugas",
    UMKM: "umkm",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
