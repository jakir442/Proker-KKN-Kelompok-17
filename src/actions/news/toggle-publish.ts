"use server";

import { revalidatePath } from "next/cache";

import { updateNewsStatus } from "@/repositories/news.repository";

import type { ActionResult } from "@/actions/shared/action-result";

export async function togglePublishAction(id: string, published: boolean): Promise<ActionResult> {
    try {
        await updateNewsStatus(id, published);

        revalidatePath("/dashboard/content/news");
        revalidatePath("/");

        return {
            success: true,
            message: published
                ? "Berita berhasil dipublikasikan."
                : "Berita berhasil dijadikan draft.",
        };
    } catch {
        return {
            success: false,
            message: "Gagal memperbarui status berita.",
        };
    }
}
