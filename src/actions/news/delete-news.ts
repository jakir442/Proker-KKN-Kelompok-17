"use server";

import { revalidatePath } from "next/cache";

import { deleteNews } from "@/repositories/news.repository";

import type { ActionResult } from "@/actions/shared/action-result";

export async function deleteNewsAction(id: string): Promise<ActionResult> {
    try {
        await deleteNews(id);

        revalidatePath("/dashboard/content/news");
        revalidatePath("/");

        return {
            success: true,
            message: "Berita berhasil dihapus.",
        };
    } catch {
        return {
            success: false,
            message: "Gagal menghapus berita.",
        };
    }
}