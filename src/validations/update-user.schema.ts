import { z } from "zod";
import { ROLES } from "@/constants/roles";

export const updateUserSchema = z.object({
    id: z.string(),
    fullName: z.string().min(3),
    username: z.string().min(3),
    email: z.email(),
    password: z
        .string()
        .optional()
        .refine((value) => !value || value.length >= 6, "Password minimal 6 karakter"),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PETUGAS, ROLES.WARGA]),
    isActive: z.boolean(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
