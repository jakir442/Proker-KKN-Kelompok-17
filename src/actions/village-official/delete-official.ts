"use server";

import { revalidatePath } from "next/cache";

import { deleteById } from "@/repositories/village-official.repository";

export async function deleteOfficialAction(id: string) {
    try {
        await deleteById(id);

        revalidatePath("/dashboard/village-official");
        revalidatePath("/pemerintahan");

        return {
            success: true,
            message: "Perangkat desa berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menghapus perangkat desa.",
        };
    }
}
