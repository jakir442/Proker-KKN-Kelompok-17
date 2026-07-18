import { z } from "zod";
import { ROLES } from "@/constants/roles";

export const createUserSchema = z.object({
    fullName: z.string().min(3, "Nama minimal 3 karakter"),

    username: z
        .string()
        .min(3, "Username minimal 3 karakter")
        .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh huruf, angka, dan underscore"),

    email: z.email("Email tidak valid"),

    password: z.string().min(6, "Password minimal 6 karakter"),

    phoneNumber: z.string().optional(),

    address: z.string().optional(),

    role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.UMKM, ROLES.PETUGAS, ROLES.WARGA]),

    isActive: z.boolean(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
