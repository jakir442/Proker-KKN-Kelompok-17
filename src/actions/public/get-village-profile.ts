"use server";

import { findVillageProfile } from "@/repositories/village-profile.repository";

export async function getVillageProfilePublicAction() {
    try {
        const profile = await findVillageProfile();

        return {
            success: true,
            data: profile,
        };
    } catch (error) {
        console.error("[Public Village Profile] Get:", error);

        return {
            success: false,
            message: "Gagal mengambil profil desa.",
            data: null,
        };
    }
}
