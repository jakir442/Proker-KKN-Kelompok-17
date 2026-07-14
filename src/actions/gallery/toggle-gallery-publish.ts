"use server";

import { revalidatePath } from "next/cache";

import { toggleGalleryPublish } from "@/repositories/gallery.repository";

import type { ActionResult } from "@/actions/shared/action-result";

export async function toggleGalleryPublishAction(
    id: string,
    published: boolean,
): Promise<ActionResult> {
    try {
        await toggleGalleryPublish(id, published);

        revalidatePath("/dashboard/galeri");
        revalidatePath("/galeri");

        return {
            success: true,
            message: published
                ? "Galeri berhasil dipublikasikan."
                : "Galeri berhasil dijadikan draft.",
        };
    } catch {
        return {
            success: false,
            message: "Gagal mengubah status galeri.",
        };
    }
}
