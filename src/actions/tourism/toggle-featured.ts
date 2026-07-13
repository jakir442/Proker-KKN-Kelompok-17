"use server";

import { revalidatePath } from "next/cache";

import { toggleFeatured } from "@/repositories/tourism.repository";

export async function toggleTourismFeaturedAction(id: string) {
    const tourism = await toggleFeatured(id);

    if (!tourism) {
        return {
            success: false,
            message: "Data wisata tidak ditemukan.",
        };
    }

    revalidatePath("/dashboard/tourism");
    revalidatePath("/tourism");

    return {
        success: true,
        message: "Status unggulan berhasil diperbarui.",
    };
}
