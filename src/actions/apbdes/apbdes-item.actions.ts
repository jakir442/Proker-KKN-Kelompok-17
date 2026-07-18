"use server";

import { revalidatePath } from "next/cache";
import { APBDesItemRepository } from "@/repositories/apbdes-item.repository";
import { APBDesItemInput, apbdesItemSchema } from "@/validations/apbdes-item.schema";

export async function createAPBDesItem(input: APBDesItemInput) {
    const validated = apbdesItemSchema.safeParse(input);

    if (!validated.success) {
        return {
            success: false,
            message: validated.error.issues[0]?.message ?? "Data tidak valid.",
        };
    }

    try {
        await APBDesItemRepository.create(validated.data);

        revalidatePath("/dashboard/apbdes");
        revalidatePath("/");
        revalidatePath("/transparansi");

        return {
            success: true,
            message: "Item anggaran berhasil ditambahkan.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menambahkan item anggaran.",
        };
    }
}

export async function updateAPBDesItem(id: string, input: APBDesItemInput) {
    const validated = apbdesItemSchema.safeParse(input);

    if (!validated.success) {
        return {
            success: false,
            message: validated.error.issues[0]?.message ?? "Data tidak valid.",
        };
    }

    try {
        await APBDesItemRepository.update(id, validated.data);

        revalidatePath("/dashboard/apbdes");
        revalidatePath("/");
        revalidatePath("/transparansi");

        return {
            success: true,
            message: "Item anggaran berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal memperbarui item anggaran.",
        };
    }
}

export async function deleteAPBDesItem(id: string) {
    try {
        await APBDesItemRepository.delete(id);

        revalidatePath("/dashboard/apbdes");
        revalidatePath("/");
        revalidatePath("/transparansi");

        return {
            success: true,
            message: "Item anggaran berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menghapus item anggaran.",
        };
    }
}
