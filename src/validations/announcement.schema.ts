import { z } from "zod";
import { ANNOUNCEMENT_CATEGORIES } from "@/constants/announcements";

export const announcementSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Judul minimal 3 karakter.")
        .max(150, "Judul maksimal 150 karakter."),

    excerpt: z
        .string()
        .trim()
        .min(10, "Ringkasan minimal 10 karakter.")
        .max(300, "Ringkasan maksimal 300 karakter."),

    content: z.string().trim().min(20, "Isi pengumuman minimal 20 karakter."),

    category: z.enum(ANNOUNCEMENT_CATEGORIES, {
        message: "Kategori tidak valid.",
    }),

    coverImage: z.string().trim().optional().or(z.literal("")),

    published: z.boolean(),
});

export type AnnouncementFormValues = z.infer<typeof announcementSchema>;
