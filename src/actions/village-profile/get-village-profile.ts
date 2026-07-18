"use server";

import { getProfile } from "@/repositories/village-profile.repository";

export async function getVillageProfileAction() {
    try {
        const profile = await getProfile();

        return {
            success: true,
            data: profile,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil profil desa.",
            data: null,
        };
    }
}
