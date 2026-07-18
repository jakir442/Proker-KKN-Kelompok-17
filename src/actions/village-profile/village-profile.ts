"use server";

import { revalidatePath } from "next/cache";

import { getProfile, upsertProfile } from "@/repositories/village-profile.repository";

import { villageProfileSchema, VillageProfileValues } from "@/validations/village-profile.schema";

export async function getVillageProfile() {
    return await getProfile();
}

export async function saveVillageProfile(values: VillageProfileValues) {
    const validated = villageProfileSchema.safeParse(values);

    if (!validated.success) {
        return {
            success: false,
            message: "Data profil desa tidak valid.",
            errors: validated.error.flatten().fieldErrors,
        };
    }

    try {
        const profile = await upsertProfile(validated.data);

        revalidatePath("/dashboard/village-profile");
        revalidatePath("/profil");

        return {
            success: true,
            message: "Profil desa berhasil disimpan.",
            data: profile,
        };
    } catch (error) {
        console.error("Save village profile:", error);

        return {
            success: false,
            message: "Terjadi kesalahan saat menyimpan profil desa.",
        };
    }
}
