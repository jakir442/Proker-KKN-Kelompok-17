import { z } from "zod";

const optionalUrl = z.union([z.string().url("URL tidak valid"), z.literal("")]);

export const villageProfileSchema = z.object({
    // =========================================================
    // BASIC INFORMATION
    // =========================================================

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

    // =========================================================
    // LOGO & OFFICE PHOTO
    // =========================================================

    logo: z.instanceof(File).nullable().optional(),

    logoUrl: optionalUrl.optional(),

    officePhoto: z.instanceof(File).nullable().optional(),

    officePhotoUrl: optionalUrl.optional(),

    // =========================================================
    // CONTENT
    // =========================================================

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

    // =========================================================
    // HEADMAN
    // =========================================================

    headman: z.object({
        name: z.string().min(3, "Nama kepala desa wajib diisi"),

        position: z.string().min(3, "Jabatan wajib diisi"),

        // File baru yang dipilih dari input
        photo: z.instanceof(File).nullable().optional(),

        // URL foto yang sudah di-upload ke Cloudinary
        photoUrl: optionalUrl.optional(),

        // Pengaturan tampilan/crop foto
        photoSettings: z
            .object({
                zoom: z.coerce.number().min(1).max(2),

                positionX: z.coerce.number().min(0).max(100),

                positionY: z.coerce.number().min(0).max(100),
            })
            .optional(),

        greeting: z.string().min(10, "Sambutan minimal 10 karakter"),
    }),

    // =========================================================
    // STATISTICS
    // =========================================================

    statistics: z.object({
        area: z.coerce.number().nonnegative("Luas wilayah tidak boleh negatif"),

        population: z.coerce.number().int().nonnegative(),

        households: z.coerce.number().int().nonnegative(),

        rt: z.coerce.number().int().nonnegative(),

        rw: z.coerce.number().int().nonnegative(),

        hamlets: z.coerce.number().int().nonnegative(),
    }),

    // =========================================================
    // LOCATION
    // =========================================================

    location: z.object({
        latitude: z.coerce.number().min(-90).max(90),

        longitude: z.coerce.number().min(-180).max(180),

        googleMaps: optionalUrl.optional(),
    }),
});

export type VillageProfileValues = z.input<typeof villageProfileSchema>;
