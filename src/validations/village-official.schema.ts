import { z } from "zod";

export const villageOfficialSchema = z.object({
    name: z.string().min(3, "Nama wajib diisi"),

    position: z.string().min(3, "Jabatan wajib diisi"),

    photo: z.string().url("URL foto tidak valid").optional().or(z.literal("")),

    phone: z.string().optional().or(z.literal("")),

    email: z.string().email("Email tidak valid").optional().or(z.literal("")),

    order: z
        .number({
            error: "Urutan wajib diisi",
        })
        .int()
        .min(0),

    isActive: z.boolean(),
});

export type VillageOfficialValues = z.infer<typeof villageOfficialSchema>;
