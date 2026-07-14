import { z } from "zod";

export const serviceSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Nama layanan minimal 3 karakter")
        .max(100, "Nama layanan maksimal 100 karakter"),

    description: z.string().trim().min(10, "Deskripsi minimal 10 karakter"),

    requirements: z
        .array(z.string().trim().min(1, "Persyaratan tidak boleh kosong"))
        .min(1, "Minimal satu persyaratan"),

    process: z.string().trim().min(10, "Alur layanan minimal 10 karakter"),

    duration: z.string().trim().min(1, "Estimasi waktu wajib diisi"),

    fee: z.string().trim().min(1, "Biaya wajib diisi"),

    icon: z.string().trim().default("FileText"),

    isPublished: z.boolean(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
