"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/actions/shared/action-result";
import { deleteUMKM } from "@/repositories/umkm.repository";

export async function deleteUMKMAction(id: string): Promise<ActionResult> {
    try {
        await deleteUMKM(id);

        revalidatePath("/dashboard/umkm");
        revalidatePath("/umkm");
        revalidatePath("/");

        return {
            success: true,
            message: "UMKM berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Terjadi kesalahan pada server.",
        };
    }
}
