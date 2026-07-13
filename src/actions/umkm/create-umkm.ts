"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/actions/shared/action-result";
import { generateSlug } from "@/lib/slug";
import { createUMKM, findUMKMBySlug } from "@/repositories/umkm.repository";
import { umkmSchema, type UMKMInput } from "@/validations/umkm.schema";

export async function createUMKMAction(input: UMKMInput): Promise<ActionResult> {
    try {
        const parsed = umkmSchema.safeParse(input);

        if (!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues[0].message,
            };
        }

        const slug = generateSlug(parsed.data.name);

        const exists = await findUMKMBySlug(slug);

        if (exists) {
            return {
                success: false,
                message: "Nama UMKM sudah digunakan.",
            };
        }

        const umkmData = {
            ...parsed.data,
            slug,
            latitude: parsed.data.latitude ?? undefined,
            longitude: parsed.data.longitude ?? undefined,
        };

        await createUMKM(umkmData);

        revalidatePath("/dashboard/umkm");
        revalidatePath("/umkm");
        revalidatePath("/");

        return {
            success: true,
            message: "UMKM berhasil ditambahkan.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Terjadi kesalahan pada server.",
        };
    }
}
