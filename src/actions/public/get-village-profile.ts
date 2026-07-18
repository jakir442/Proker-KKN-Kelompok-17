"use server";

import { getProfile } from "@/repositories/village-profile.repository";

export async function getVillageProfilePublicAction() {
    try {
        const profile = await getProfile();

        return {
            success: true,
            data: profile
                ? {
                      about: profile.about,
                      history: profile.history,
                      vision: profile.vision,
                      mission: profile.mission,

                      headmanName: profile.headmanName,
                      headmanPhoto: profile.headmanPhoto,
                      headmanGreeting: profile.headmanGreeting,

                      area: profile.area,
                      population: profile.population,
                      households: profile.households,

                      rt: profile.rt,
                      rw: profile.rw,
                      hamlets: profile.hamlets,

                      latitude: profile.latitude,
                      longitude: profile.longitude,
                  }
                : null,
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
