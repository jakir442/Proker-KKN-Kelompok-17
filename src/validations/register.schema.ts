import { z } from "zod";

export const registerSchema = z
    .object({
        fullName: z.string().min(3, "Nama minimal 3 karakter.").max(100, "Nama terlalu panjang."),
        username: z
            .string()
            .min(3, "Username minimal 3 karakter.")
            .max(30, "Username maksimal 30 karakter.")
            .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh berisi huruf, angka, dan underscore."),
        email: z.email("Format email tidak valid.").trim(),
        password: z.string().min(8, "Password minimal 8 karakter."),
        confirmPassword: z.string(),
        phoneNumber: z.string().optional(),
        address: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Konfirmasi password tidak sesuai.",
        path: ["confirmPassword"],
    });

export type RegisterSchema = z.infer<typeof registerSchema>;
