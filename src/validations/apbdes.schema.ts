import { APBDesStatus } from "@/constants/apbdes";
import { z } from "zod";

export const apbdesSchema = z.object({
    year: z
        .number({
            error: "Tahun wajib diisi",
        })
        .min(2000, "Tahun minimal 2000")
        .max(2100, "Tahun maksimal 2100"),

    title: z
        .string({
            error: "Judul wajib diisi",
        })
        .trim()
        .min(3, "Judul minimal 3 karakter")
        .max(100, "Judul maksimal 100 karakter"),

    description: z.string().trim().max(1000, "Deskripsi maksimal 1000 karakter"),

    status: z.nativeEnum(APBDesStatus, {
        error: "Status tidak valid",
    }),
});

export type APBDesInput = z.infer<typeof apbdesSchema>;
