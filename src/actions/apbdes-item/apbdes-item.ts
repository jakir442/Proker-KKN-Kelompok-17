"use server";

import { revalidatePath } from "next/cache";

import { APBDesItemRepository } from "@/repositories/apbdes-item.repository";

import { APBDesItemInput, apbdesItemSchema } from "@/validations/apbdes-item.schema";

export async function createAPBDesItemAction(
    data: APBDesItemInput & {
        apbdesId: string;
    },
) {
    const parsed = apbdesItemSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            message: "Data tidak valid.",
        };
    }

    try {
        await APBDesItemRepository.create(data);

        revalidatePath(`/dashboard/apbdes/${data.apbdesId}`);

        return {
            success: true,
            message: "Item APBDes berhasil ditambahkan.",
        };
    } catch {
        return {
            success: false,
            message: "Gagal menambahkan item APBDes.",
        };
    }
}

export async function updateAPBDesItemAction(id: string, data: APBDesItemInput) {
    const parsed = apbdesItemSchema.safeParse(data);

    if (!parsed.success) {
        return {
            success: false,
            message: "Data tidak valid.",
        };
    }

    try {
        const item = await APBDesItemRepository.findById(id);

        if (!item) {
            return {
                success: false,
                message: "Item tidak ditemukan.",
            };
        }

        await APBDesItemRepository.update(id, data);

        revalidatePath(`/dashboard/apbdes/${item.apbdesId}`);

        return {
            success: true,
            message: "Item APBDes berhasil diperbarui.",
        };
    } catch {
        return {
            success: false,
            message: "Gagal memperbarui item APBDes.",
        };
    }
}

export async function deleteAPBDesItemAction(id: string) {
    try {
        const item = await APBDesItemRepository.findById(id);

        if (!item) {
            return {
                success: false,
                message: "Item tidak ditemukan.",
            };
        }

        await APBDesItemRepository.delete(id);

        revalidatePath(`/dashboard/apbdes/${item.apbdesId}`);

        return {
            success: true,
            message: "Item APBDes berhasil dihapus.",
        };
    } catch {
        return {
            success: false,
            message: "Gagal menghapus item APBDes.",
        };
    }
}
