"use server";

import { revalidatePath } from "next/cache";

import { toggleStatus } from "@/repositories/tourism.repository";

export async function toggleTourismStatusAction(id: string) {
    const tourism = await toggleStatus(id);

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
        message: "Status publikasi berhasil diperbarui.",
    };
}
