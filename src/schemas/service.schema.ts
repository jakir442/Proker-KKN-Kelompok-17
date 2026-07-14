import { z } from "zod";

export const serviceSchema = z.object({
    title: z.string().min(3, "Nama layanan minimal 3 karakter"),

    slug: z.string().min(3, "Slug minimal 3 karakter"),

    description: z.string().min(10, "Deskripsi minimal 10 karakter"),

    requirements: z.array(z.string().min(1)).min(1, "Minimal satu persyaratan"),

    process: z.string().min(10, "Proses minimal 10 karakter"),

    duration: z.string().min(1, "Estimasi wajib diisi"),

    fee: z.string().min(1, "Biaya wajib diisi"),

    icon: z.string().default("FileText"),

    isPublished: z.boolean(),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
