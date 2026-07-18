"use server";

import { revalidatePath } from "next/cache";
import { updateService } from "@/repositories/service.repository";
import type { ActionResult } from "@/actions/shared/action-result";
import type { ServiceInput } from "@/validations/service.schema";
import { serviceSchema } from "@/validations/service.schema";

export async function updateServiceAction(id: string, input: ServiceInput): Promise<ActionResult> {
    const parsed = serviceSchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    await updateService(id, parsed.data);

    revalidatePath("/dashboard/layanan");
    revalidatePath("/layanan");

    return {
        success: true,
        message: "Layanan berhasil diperbarui.",
    };
}
