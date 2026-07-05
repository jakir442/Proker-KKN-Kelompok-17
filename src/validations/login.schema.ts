import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Username minimal 3 karakter.")
        .max(30, "Username maksimal 30 karakter."),

    password: z
        .string()
        .min(8, "Password minimal 8 karakter.")
        .max(100, "Password terlalu panjang."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
