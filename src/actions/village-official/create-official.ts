"use server";

import { revalidatePath } from "next/cache";

import { create } from "@/repositories/village-official.repository";
import { villageOfficialSchema } from "@/validations/village-official.schema";

export async function createOfficialAction(values: unknown) {
    const validated = villageOfficialSchema.safeParse(values);

    if (!validated.success) {
        return {
            success: false,
            message: "Data perangkat desa tidak valid.",
        };
    }

    try {
        await create(validated.data);

        revalidatePath("/dashboard/village-official");
        revalidatePath("/pemerintahan");

        return {
            success: true,
            message: "Perangkat desa berhasil ditambahkan.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menambahkan perangkat desa.",
        };
    }
}
