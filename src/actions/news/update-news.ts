"use server";

import { revalidatePath } from "next/cache";

import { updateNews } from "@/repositories/news.repository";
import { newsSchema } from "@/validations/news.schema";

import type { ActionResult } from "@/actions/shared/action-result";
import type { NewsInput } from "@/validations/news.schema";

export async function updateNewsAction(id: string, input: NewsInput): Promise<ActionResult> {
    const parsed = newsSchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    await updateNews(id, parsed.data);

    revalidatePath("/dashboard/content/news");
    revalidatePath("/");

    return {
        success: true,
        message: "Berita berhasil diperbarui.",
    };
}
