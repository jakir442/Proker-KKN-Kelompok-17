"use server";

import { revalidatePath } from "next/cache";

import {
    findVillageProfile,
    updateVillageProfile,
} from "@/repositories/village-profile.repository";

import {
    villageProfileSchema,
    type VillageProfileValues,
} from "@/validations/village-profile.schema";

export async function getVillageProfileAction() {
    try {
        const profile = await findVillageProfile();

        return {
            success: true,
            data: profile,
        };
    } catch (error) {
        console.error("[Village Profile] Get:", error);

        return {
            success: false,
            message: "Gagal mengambil profil desa.",
            data: null,
        };
    }
}

export async function updateVillageProfileAction(values: VillageProfileValues) {
    const validated = villageProfileSchema.safeParse(values);

    if (!validated.success) {
        return {
            success: false,
            message: "Data profil desa tidak valid.",
            errors: validated.error.flatten().fieldErrors,
        };
    }

    try {
        const payload = {
            villageName: validated.data.villageName,
            address: validated.data.address,
            district: validated.data.district,
            regency: validated.data.regency,
            province: validated.data.province,
            postalCode: validated.data.postalCode ?? "",
            email: validated.data.email,
            phone: validated.data.phone ?? "",
            website: validated.data.website ?? "",
            officeHours: validated.data.officeHours ?? "",
            about: validated.data.about,
            history: validated.data.history,
            vision: validated.data.vision,
            mission: validated.data.mission.map((item) => item.value),
            headman: {
                name: validated.data.headman.name,
                position: validated.data.headman.position,
                greeting: validated.data.headman.greeting,

                photo:
                    typeof validated.data.headman.photo === "string"
                        ? validated.data.headman.photo
                        : (validated.data.headman.photoUrl ?? ""),
            },
            statistics: validated.data.statistics,
            location: validated.data.location,
            logo:
                typeof validated.data.logo === "string"
                    ? validated.data.logo
                    : (validated.data.logoUrl ?? ""),
            officePhoto:
                typeof validated.data.officePhoto === "string"
                    ? validated.data.officePhoto
                    : (validated.data.officePhotoUrl ?? ""),
        };

        const profile = await updateVillageProfile(payload);
        revalidatePath("/dashboard/admin/profile-desa");
        revalidatePath("/profil");
        return {
            success: true,
            message: "Profil desa berhasil diperbarui.",
            data: profile,
        };
    } catch (error) {
        console.error("[Village Profile] Update:", error);

        return {
            success: false,
            message: "Terjadi kesalahan saat menyimpan profil desa.",
        };
    }
}
