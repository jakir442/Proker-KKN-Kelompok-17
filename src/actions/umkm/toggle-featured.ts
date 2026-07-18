"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/actions/shared/action-result";
import { findUMKMById, updateUMKM } from "@/repositories/umkm.repository";

export async function toggleUMKMFeaturedAction(id: string): Promise<ActionResult> {
    try {
        const umkm = await findUMKMById(id);

        if (!umkm) {
            return {
                success: false,
                message: "UMKM tidak ditemukan.",
            };
        }

        await updateUMKM(id, {
            featured: !umkm.featured,
        });

        revalidatePath("/dashboard/umkm");
        revalidatePath("/umkm");
        revalidatePath("/");

        return {
            success: true,
            message: "UMKM unggulan berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Terjadi kesalahan pada server.",
        };
    }
}
