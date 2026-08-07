import { z } from "zod";

const optionalUrl = z.union([z.string().url("URL tidak valid"), z.literal("")]);

export const villageProfileSchema = z.object({
    // Basic Information
    villageName: z.string().min(3, "Nama desa minimal 3 karakter"),
    address: z.string().min(10, "Alamat minimal 10 karakter"),
    district: z.string().min(3, "Kecamatan wajib diisi"),
    regency: z.string().min(3, "Kabupaten wajib diisi"),
    province: z.string().min(3, "Provinsi wajib diisi"),
    postalCode: z.string().max(10).optional(),
    email: z.string().email("Email tidak valid").or(z.literal("")),

    phone: z.string().max(20).optional(),

    website: optionalUrl.optional(),

    officeHours: z.string().optional(),

    logo: z.instanceof(File).nullable().optional(),

    officePhoto: z.instanceof(File).nullable().optional(),

    logoUrl: optionalUrl.optional(),

    officePhotoUrl: optionalUrl.optional(),

    // Content
    about: z.string().min(10, "Tentang desa minimal 10 karakter"),

    history: z.string().min(10, "Sejarah desa minimal 10 karakter"),

    vision: z.string().min(5, "Visi wajib diisi"),

    mission: z
        .array(
            z.object({
                value: z.string().min(3, "Misi minimal 3 karakter"),
            }),
        )
        .min(1, "Minimal satu misi harus diisi"),

    // Headman
    headman: z.object({
        name: z.string().min(3, "Nama kepala desa wajib diisi"),

        position: z.string().min(3, "Jabatan wajib diisi"),

        photo: z.instanceof(File).nullable().optional(),

        photoUrl: optionalUrl.optional(),

        greeting: z.string().min(10, "Sambutan minimal 10 karakter"),
    }),

    // Statistics
    statistics: z.object({
        area: z.coerce.number().nonnegative("Luas wilayah tidak boleh negatif"),

        population: z.coerce.number().int().nonnegative(),

        households: z.coerce.number().int().nonnegative(),

        rt: z.coerce.number().int().nonnegative(),

        rw: z.coerce.number().int().nonnegative(),

        hamlets: z.coerce.number().int().nonnegative(),
    }),

    // Location
    location: z.object({
        latitude: z.coerce.number().min(-90).max(90),

        longitude: z.coerce.number().min(-180).max(180),

        googleMaps: optionalUrl.optional(),
    }),
});

export type VillageProfileValues = z.input<typeof villageProfileSchema>;
