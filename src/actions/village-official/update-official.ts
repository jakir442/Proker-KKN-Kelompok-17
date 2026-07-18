"use server";

import { revalidatePath } from "next/cache";

import { update } from "@/repositories/village-official.repository";

import { villageOfficialSchema } from "@/validations/village-official.schema";

export async function updateOfficialAction(id: string, values: unknown) {
    const validated = villageOfficialSchema.safeParse(values);

    if (!validated.success) {
        return {
            success: false,
            message: "Data perangkat desa tidak valid.",
        };
    }

    try {
        await update(id, validated.data);

        revalidatePath("/dashboard/village-official");
        revalidatePath("/pemerintahan");

        return {
            success: true,
            message: "Perangkat desa berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal memperbarui perangkat desa.",
        };
    }
}
