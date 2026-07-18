"use server";

import { revalidatePath } from "next/cache";

import { APBDesRepository } from "@/repositories/apbdes.repository";
import { APBDesInput, apbdesSchema } from "@/validations/apbdes.schema";

export async function createAPBDesAction(input: APBDesInput) {
    const validated = apbdesSchema.safeParse(input);

    if (!validated.success) {
        return {
            success: false,
            message: validated.error.issues[0]?.message ?? "Data tidak valid.",
        };
    }

    try {
        await APBDesRepository.create({
            ...validated.data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        revalidatePath("/dashboard/apbdes");
        revalidatePath("/");

        return {
            success: true,
            message: "APBDes berhasil ditambahkan.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menambahkan APBDes.",
        };
    }
}

export async function updateAPBDesAction(id: string, input: APBDesInput) {
    const validated = apbdesSchema.safeParse(input);

    if (!validated.success) {
        return {
            success: false,
            message: validated.error.issues[0]?.message ?? "Data tidak valid.",
        };
    }

    try {
        await APBDesRepository.update(id, validated.data);

        revalidatePath("/dashboard/apbdes");
        revalidatePath("/");

        return {
            success: true,
            message: "APBDes berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal memperbarui APBDes.",
        };
    }
}

export async function deleteAPBDesAction(id: string) {
    try {
        await APBDesRepository.delete(id);

        revalidatePath("/dashboard/apbdes");
        revalidatePath("/");

        return {
            success: true,
            message: "APBDes berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menghapus APBDes.",
        };
    }
}

export async function activateAPBDesAction(id: string) {
    try {
        await APBDesRepository.setActive(id);

        revalidatePath("/dashboard/apbdes");
        revalidatePath("/");
        revalidatePath("/transparansi");

        return {
            success: true,
            message: "APBDes berhasil dijadikan aktif.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengaktifkan APBDes.",
        };
    }
}
