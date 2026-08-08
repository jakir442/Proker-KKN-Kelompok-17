"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import { updateVillageProfile } from "@/repositories/village-profile.repository";

import {
    villageProfileSchema,
    type VillageProfileValues,
} from "@/validations/village-profile.schema";

interface ActionResult {
    success: boolean;
    message: string;
}

export async function updateVillageProfileAction(
    values: VillageProfileValues,
): Promise<ActionResult> {
    try {
        const session = await auth();

        if (!session?.user) {
            return {
                success: false,
                message: "Unauthorized.",
            };
        }

        const validated = villageProfileSchema.safeParse(values);

        if (!validated.success) {
            return {
                success: false,
                message: "Data tidak valid.",
            };
        }

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

                photo: validated.data.headman.photoUrl ?? "",

                photoSettings: {
                    zoom: validated.data.headman.photoSettings?.zoom ?? 1,

                    positionX: validated.data.headman.photoSettings?.positionX ?? 50,

                    positionY: validated.data.headman.photoSettings?.positionY ?? 50,
                },
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

        await updateVillageProfile(payload);

        revalidatePath("/");
        revalidatePath("/profil-desa");
        revalidatePath("/dashboard/admin/village-profile");

        return {
            success: true,
            message: "Profil desa berhasil diperbarui.",
        };
    } catch (error) {
        console.error("[UPDATE_VILLAGE_PROFILE]", error);

        return {
            success: false,
            message: "Terjadi kesalahan saat memperbarui profil desa.",
        };
    }
}
