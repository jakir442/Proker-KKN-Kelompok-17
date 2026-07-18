import { z } from "zod";

export const umkmSchema = z.object({
    name: z.string().min(3, "Nama UMKM minimal 3 karakter."),
    description: z.string().min(10, "Deskripsi minimal 10 karakter."),

    logo: z.string().optional(),
    gallery: z.array(z.string()),

    owner: z.string().min(3, "Nama pemilik wajib diisi."),
    whatsapp: z.string().min(10, "Nomor WhatsApp tidak valid."),
    category: z.string().min(1, "Kategori wajib dipilih."),
    address: z.string().min(5, "Alamat wajib diisi."),

    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),

    openTime: z.string(),
    closeTime: z.string(),

    featured: z.boolean(),
    isActive: z.boolean(),
});

export type UMKMInput = z.infer<typeof umkmSchema>;
