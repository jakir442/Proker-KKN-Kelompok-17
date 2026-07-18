import { z } from "zod";

export const eventSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(5, "Judul minimal 5 karakter.")
            .max(150, "Judul maksimal 150 karakter."),

        description: z.string().trim().min(20, "Deskripsi minimal 20 karakter."),

        location: z
            .string()
            .trim()
            .min(3, "Lokasi minimal 3 karakter.")
            .max(200, "Lokasi maksimal 200 karakter."),

        coverImage: z.string().trim().url("Cover harus berupa URL yang valid.").or(z.literal("")),

        startDate: z.string().min(1, "Tanggal mulai wajib diisi."),

        startTime: z.string().min(1, "Jam mulai wajib diisi."),

        endDate: z.string().min(1, "Tanggal selesai wajib diisi."),

        endTime: z.string().min(1, "Jam selesai wajib diisi."),

        published: z.boolean(),
    })
    .refine(
        (data) => {
            const start = new Date(`${data.startDate} ${data.startTime}`);
            const end = new Date(`${data.endDate} ${data.endTime}`);

            return end >= start;
        },
        {
            path: ["endTime"],
            message: "Waktu selesai harus setelah waktu mulai.",
        },
    );

export type EventFormValues = z.infer<typeof eventSchema>;
