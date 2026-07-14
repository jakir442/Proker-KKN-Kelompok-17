"use server";

import { revalidatePath } from "next/cache";
import { createService, findServiceBySlug } from "@/repositories/service.repository";
import { generateSlug } from "@/lib/slug";
import type { ActionResult } from "@/actions/shared/action-result";
import type { ServiceInput } from "@/validations/service.schema";
import { serviceSchema } from "@/validations/service.schema";

export async function createServiceAction(input: ServiceInput): Promise<ActionResult> {
    const parsed = serviceSchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const slug = generateSlug(parsed.data.title);

    const exists = await findServiceBySlug(slug);

    if (exists) {
        return {
            success: false,
            message: "Nama layanan sudah digunakan.",
        };
    }

    await createService({
        ...parsed.data,
        slug,
    });

    revalidatePath("/dashboard/layanan");
    revalidatePath("/layanan");

    return {
        success: true,
        message: "Layanan berhasil ditambahkan.",
    };
}
