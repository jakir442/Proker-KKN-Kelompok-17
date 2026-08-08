import { z } from "zod";

const optionalUrl = z.union([z.string().url("URL tidak valid"), z.literal("")]);

// =============================================================
// PHOTO SETTINGS
// =============================================================

export const photoSettingsSchema = z.object({
    zoom: z.number().min(1, "Zoom minimal 1").max(2, "Zoom maksimal 2"),

    positionX: z
        .number()
        .min(0, "Posisi horizontal minimal 0")
        .max(100, "Posisi horizontal maksimal 100"),

    positionY: z
        .number()
        .min(0, "Posisi vertikal minimal 0")
        .max(100, "Posisi vertikal maksimal 100"),
});

// =============================================================
// VILLAGE PROFILE
// =============================================================

export const villageProfileSchema = z.object({
    // =========================================================
    // BASIC INFORMATION
    // =========================================================

    villageName: z.string().min(3, "Nama desa minimal 3 karakter"),

    address: z.string().min(10, "Alamat minimal 10 karakter"),

    district: z.string().min(3, "Kecamatan wajib diisi"),

    regency: z.string().min(3, "Kabupaten wajib diisi"),

    province: z.string().min(3, "Provinsi wajib diisi"),

    postalCode: z.string().max(10, "Kode pos maksimal 10 karakter").optional(),

    email: z.string().email("Email tidak valid").or(z.literal("")),

    phone: z.string().max(20, "Nomor telepon maksimal 20 karakter").optional(),

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

        photo: z.instanceof(File).nullable().optional(),

        photoUrl: optionalUrl.optional(),

        photoSettings: photoSettingsSchema.optional(),

        greeting: z.string().min(10, "Sambutan minimal 10 karakter"),
    }),

    // =========================================================
    // STATISTICS
    // =========================================================

    statistics: z.object({
        area: z.number().nonnegative("Luas wilayah tidak boleh negatif"),

        population: z
            .number()
            .int("Jumlah penduduk harus berupa angka bulat")
            .nonnegative("Jumlah penduduk tidak boleh negatif"),

        households: z
            .number()
            .int("Jumlah KK harus berupa angka bulat")
            .nonnegative("Jumlah KK tidak boleh negatif"),

        rt: z
            .number()
            .int("Jumlah RT harus berupa angka bulat")
            .nonnegative("Jumlah RT tidak boleh negatif"),

        rw: z
            .number()
            .int("Jumlah RW harus berupa angka bulat")
            .nonnegative("Jumlah RW tidak boleh negatif"),

        hamlets: z
            .number()
            .int("Jumlah dusun harus berupa angka bulat")
            .nonnegative("Jumlah dusun tidak boleh negatif"),
    }),

    // =========================================================
    // LOCATION
    // =========================================================

    location: z.object({
        latitude: z.number().min(-90, "Latitude tidak valid").max(90, "Latitude tidak valid"),

        longitude: z.number().min(-180, "Longitude tidak valid").max(180, "Longitude tidak valid"),

        googleMaps: optionalUrl.optional(),
    }),
});

// =============================================================
// TYPES
// =============================================================

export type VillageProfileValues = z.infer<typeof villageProfileSchema>;

export type PhotoSettings = z.infer<typeof photoSettingsSchema>;
