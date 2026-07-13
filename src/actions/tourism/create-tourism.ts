"use server";

import { revalidatePath } from "next/cache";
import { createTourism, findTourismBySlug } from "@/repositories/tourism.repository";
import { tourismSchema } from "@/validations/tourism.schema";
import { generateSlug } from "@/lib/slug";

import type { TourismInput } from "@/validations/tourism.schema";
import type { ActionResult } from "@/actions/shared/action-result";

export async function createTourismAction(input: TourismInput): Promise<ActionResult> {
    const parsed = tourismSchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const slug = generateSlug(parsed.data.name);

    const exists = await findTourismBySlug(slug);

    if (exists) {
        return {
            success: false,
            message: "Nama wisata sudah digunakan.",
        };
    }

    await createTourism({
        ...parsed.data,
        slug,
    });

    revalidatePath("/dashboard/tourism");
    revalidatePath("/tourism");

    return {
        success: true,
        message: "Destinasi wisata berhasil ditambahkan.",
    };
}
