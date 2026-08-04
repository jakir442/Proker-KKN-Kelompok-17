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
            ...validated.data,

            postalCode: validated.data.postalCode ?? "",
            phone: validated.data.phone ?? "",

            logo: typeof validated.data.logo === "string" ? validated.data.logo : "",

            officePhoto:
                typeof validated.data.officePhoto === "string" ? validated.data.officePhoto : "",

            mission: validated.data.mission.map((item) =>
                typeof item === "string" ? item : item.value,
            ),

            vision: validated.data.vision,
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
