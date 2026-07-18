"use server";

import { revalidatePath } from "next/cache";
import { deleteTourism } from "@/repositories/tourism.repository";
import type { ActionResult } from "@/actions/shared/action-result";

export async function deleteTourismAction(id: string): Promise<ActionResult> {
    try {
        await deleteTourism(id);

        revalidatePath("/dashboard/tourism");
        revalidatePath("/tourism");

        return {
            success: true,
            message: "Destinasi wisata berhasil dihapus.",
        };
    } catch {
        return {
            success: false,
            message: "Gagal menghapus destinasi wisata.",
        };
    }
}
