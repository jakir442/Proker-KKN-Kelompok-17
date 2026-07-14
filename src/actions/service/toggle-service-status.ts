"use server";

import { revalidatePath } from "next/cache";

import { updateServiceStatus } from "@/repositories/service.repository";

import type { ActionResult } from "@/actions/shared/action-result";

export async function toggleServiceStatusAction(
    id: string,
    isPublished: boolean,
): Promise<ActionResult> {
    await updateServiceStatus(id, isPublished);

    revalidatePath("/dashboard/layanan");
    revalidatePath("/layanan");

    return {
        success: true,
        message: "Status layanan berhasil diperbarui.",
    };
}
