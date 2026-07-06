"use server";

import { revalidatePath } from "next/cache";
import { deleteUser } from "@/repositories/user/delete-user";

export async function deleteUserAction(id: string) {
    try {
        const user = await deleteUser(id);

        if (!user) {
            return {
                success: false,
                message: "User tidak ditemukan.",
            };
        }

        revalidatePath("/dashboard/users");

        return {
            success: true,
            message: "User berhasil dihapus.",
        };
    } catch {
        return {
            success: false,
            message: "Terjadi kesalahan.",
        };
    }
}
