import { z } from "zod";

export const villageProfileSchema = z.object({
    about: z.string().min(10, "Tentang desa minimal 10 karakter"),

    history: z.string().min(10, "Sejarah desa minimal 10 karakter"),

    vision: z.string().min(5, "Visi wajib diisi"),

    mission: z
        .array(z.string().min(3, "Misi tidak boleh kosong"))
        .min(1, "Minimal satu misi harus diisi"),

    headmanName: z.string().min(3, "Nama kepala desa wajib diisi"),

    headmanPhoto: z.string().url("URL foto tidak valid").optional().or(z.literal("")),

    headmanGreeting: z.string().min(10, "Sambutan minimal 10 karakter"),

    area: z
        .number({
            error: "Luas wilayah wajib diisi",
        })
        .positive("Luas wilayah harus lebih dari 0"),

    population: z
        .number({
            error: "Jumlah penduduk wajib diisi",
        })
        .int("Harus berupa bilangan bulat")
        .nonnegative(),

    households: z
        .number({
            error: "Jumlah KK wajib diisi",
        })
        .int()
        .nonnegative(),

    rt: z
        .number({
            error: "Jumlah RT wajib diisi",
        })
        .int()
        .nonnegative(),

    rw: z
        .number({
            error: "Jumlah RW wajib diisi",
        })
        .int()
        .nonnegative(),

    hamlets: z
        .number({
            error: "Jumlah dusun wajib diisi",
        })
        .int()
        .nonnegative(),

    latitude: z
        .number({
            error: "Latitude wajib diisi",
        })
        .min(-90)
        .max(90),

    longitude: z
        .number({
            error: "Longitude wajib diisi",
        })
        .min(-180)
        .max(180),
});

export type VillageProfileValues = z.infer<typeof villageProfileSchema>;
