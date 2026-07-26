import { z } from "zod";

export const eventSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(5, "Judul minimal 5 karakter.")
            .max(150, "Judul maksimal 150 karakter."),

        description: z
            .string()
            .trim()
            .min(20, "Deskripsi minimal 20 karakter.")
            .max(5000, "Deskripsi maksimal 5000 karakter."),

        location: z
            .string()
            .trim()
            .min(3, "Lokasi minimal 3 karakter.")
            .max(200, "Lokasi maksimal 200 karakter."),

        // latitude: z.coerce
        //     .number({
        //         error: "Latitude wajib diisi.",
        //     })
        //     .min(-90, "Latitude tidak valid.")
        //     .max(90, "Latitude tidak valid."),

        // longitude: z.coerce
        //     .number({
        //         error: "Longitude wajib diisi.",
        //     })
        //     .min(-180, "Longitude tidak valid.")
        //     .max(180, "Longitude tidak valid."),

        coverImage: z.string().trim().url("Cover harus berupa URL yang valid.").or(z.literal("")),

        startDate: z.string().min(1, "Tanggal mulai wajib diisi."),

        startTime: z.string().min(1, "Jam mulai wajib diisi."),

        endDate: z.string().min(1, "Tanggal selesai wajib diisi."),

        endTime: z.string().min(1, "Jam selesai wajib diisi."),

        published: z.boolean(),
    })
    .superRefine((data, ctx) => {
        const start = new Date(`${data.startDate}T${data.startTime}`);
        const end = new Date(`${data.endDate}T${data.endTime}`);

        if (Number.isNaN(start.getTime())) {
            ctx.addIssue({
                code: "custom",
                path: ["startDate"],
                message: "Tanggal mulai tidak valid.",
            });
        }

        if (Number.isNaN(end.getTime())) {
            ctx.addIssue({
                code: "custom",
                path: ["endDate"],
                message: "Tanggal selesai tidak valid.",
            });
        }

        if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end < start) {
            ctx.addIssue({
                code: "custom",
                path: ["endTime"],
                message: "Waktu selesai harus setelah waktu mulai.",
            });
        }
    });

export type EventFormValues = z.infer<typeof eventSchema>;
