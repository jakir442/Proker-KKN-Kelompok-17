"use server";

import { revalidatePath } from "next/cache";

import { updateTourism } from "@/repositories/tourism.repository";
import { tourismSchema } from "@/validations/tourism.schema";

import type { ActionResult } from "@/actions/shared/action-result";
import type { TourismInput } from "@/validations/tourism.schema";

export async function updateTourismAction(id: string, input: TourismInput): Promise<ActionResult> {
    const parsed = tourismSchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    await updateTourism(id, parsed.data);

    revalidatePath("/dashboard/tourism");
    revalidatePath("/tourism");

    return {
        success: true,
        message: "Destinasi wisata berhasil diperbarui.",
    };
}
