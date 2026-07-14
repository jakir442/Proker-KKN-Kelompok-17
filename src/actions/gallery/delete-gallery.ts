"use server";

import { revalidatePath } from "next/cache";

import { deleteGallery } from "@/repositories/gallery.repository";

import type { ActionResult } from "@/actions/shared/action-result";

export async function deleteGalleryAction(id: string): Promise<ActionResult> {
    try {
        await deleteGallery(id);

        revalidatePath("/dashboard/galeri");
        revalidatePath("/galeri");

        return {
            success: true,
            message: "Foto galeri berhasil dihapus.",
        };
    } catch {
        return {
            success: false,
            message: "Gagal menghapus foto galeri.",
        };
    }
}
