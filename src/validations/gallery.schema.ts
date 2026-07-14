import { z } from "zod";
import { GALLERY_ALBUMS } from "@/constants/gallery";

export const gallerySchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Judul minimal 3 karakter.")
        .max(150, "Judul maksimal 150 karakter."),

    description: z
        .string()
        .trim()
        .max(1000, "Deskripsi maksimal 1000 karakter.")
        .optional()
        .or(z.literal("")),

    album: z.enum(GALLERY_ALBUMS, {
        message: "Album wajib dipilih.",
    }),

    image: z.string().min(1, "Foto wajib diunggah.").url("URL foto tidak valid."),

    takenAt: z.date({
        message: "Tanggal kegiatan tidak valid.",
    }),

    isPublished: z.boolean(),
});

export type GalleryInput = z.infer<typeof gallerySchema>;
