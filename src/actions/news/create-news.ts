"use server";

import { revalidatePath } from "next/cache";

import { createNews, findNewsBySlug } from "@/repositories/news.repository";
import { newsSchema } from "@/validations/news.schema";
import { generateSlug } from "@/lib/slug";

import type { NewsInput } from "@/validations/news.schema";
import type { ActionResult } from "@/actions/shared/action-result";

export async function createNewsAction(input: NewsInput): Promise<ActionResult> {
    const parsed = newsSchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const slug = generateSlug(parsed.data.title);

    const exists = await findNewsBySlug(slug);

    if (exists) {
        return {
            success: false,
            message: "Judul berita sudah digunakan.",
        };
    }
    console.log("=== CREATE NEWS ===");
    console.log(parsed.data);

    await createNews({
        ...parsed.data,
        slug,
    });

    revalidatePath("/dashboard/berita");
    revalidatePath("/");

    return {
        success: true,
        message: "Berita berhasil ditambahkan.",
    };
}
