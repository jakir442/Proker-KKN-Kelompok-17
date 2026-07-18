"use server";

import { revalidatePath } from "next/cache";

import { deleteService } from "@/repositories/service.repository";

import type { ActionResult } from "@/actions/shared/action-result";

export async function deleteServiceAction(id: string): Promise<ActionResult> {
    await deleteService(id);

    revalidatePath("/dashboard/layanan");
    revalidatePath("/layanan");

    return {
        success: true,
        message: "Layanan berhasil dihapus.",
    };
}
