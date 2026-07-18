import { TOURISM_CATEGORIES, TOURISM_STATUS } from "@/constants/tourism";
import { z } from "zod";

export const tourismSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Nama wisata minimal 3 karakter.")
        .max(100, "Nama wisata maksimal 100 karakter."),

    shortDescription: z
        .string()
        .trim()
        .min(10, "Deskripsi singkat minimal 10 karakter.")
        .max(200, "Deskripsi singkat maksimal 200 karakter."),

    description: z.string().trim().min(20, "Deskripsi minimal 20 karakter."),

    image: z.string().min(1, "Cover wisata wajib diunggah."),

    gallery: z.array(z.string()).default([]),

    address: z.string().trim().min(5, "Alamat wajib diisi."),

    latitude: z.number().optional(),

    longitude: z.number().optional(),

    category: z.enum(TOURISM_CATEGORIES, {
        message: "Kategori tidak valid.",
    }),

    facilities: z.array(z.string()).default([]),

    openingHours: z.string().optional(),

    ticketPrice: z.number().min(0, "Harga tiket tidak boleh kurang dari 0.").optional(),

    contact: z.string().optional(),

    featured: z.boolean().default(false),

    status: z.enum(TOURISM_STATUS),
});

export type TourismInput = z.infer<typeof tourismSchema>;
