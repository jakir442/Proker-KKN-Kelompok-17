"use server";

import { revalidatePath } from "next/cache";

import type { ActionResult } from "@/actions/shared/action-result";
import { generateSlug } from "@/lib/slug";
import { findUMKMById, updateUMKM } from "@/repositories/umkm.repository";
import { umkmSchema, type UMKMInput } from "@/validations/umkm.schema";

export async function updateUMKMAction(id: string, input: UMKMInput): Promise<ActionResult> {
    try {
        const parsed = umkmSchema.safeParse(input);

        if (!parsed.success) {
            return {
                success: false,
                message: parsed.error.issues[0].message,
            };
        }

        const existing = await findUMKMById(id);

        if (!existing) {
            return {
                success: false,
                message: "UMKM tidak ditemukan.",
            };
        }

        await updateUMKM(id, {
            ...parsed.data,
            slug: generateSlug(parsed.data.name),
            latitude: parsed.data.latitude ?? undefined,
            longitude: parsed.data.longitude ?? undefined,
        });

        revalidatePath("/dashboard/umkm");
        revalidatePath("/umkm");
        revalidatePath("/");

        return {
            success: true,
            message: "UMKM berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Terjadi kesalahan pada server.",
        };
    }
}
