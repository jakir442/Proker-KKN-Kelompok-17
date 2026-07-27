"use server";

import { revalidatePath } from "next/cache";

import { canDeleteUser, getCurrentUserRole } from "@/lib/permissions";

import { findUserById } from "@/repositories/user.repository";

import { deleteUser } from "@/repositories/user/delete-user";

export async function deleteUserAction(id: string) {
    try {
        const currentRole = await getCurrentUserRole();

        const targetUser = await findUserById(id);

        if (!targetUser) {
            return {
                success: false,
                message: "User tidak ditemukan.",
            };
        }

        if (!canDeleteUser(currentRole, targetUser.role)) {
            return {
                success: false,
                message: "Anda tidak memiliki izin menghapus user ini.",
            };
        }

        await deleteUser(id);

        revalidatePath("/dashboard/super-admin/users");
        revalidatePath("/dashboard/admin/users");

        return {
            success: true,
            message: "User berhasil dihapus.",
        };
    } catch (error) {
        console.error("DELETE USER ERROR:", error);

        return {
            success: false,
            message: "Terjadi kesalahan pada server.",
        };
    }
}
