"use server";

import { revalidatePath } from "next/cache";

import { canEditUser } from "@/lib/permissions";
import { getCurrentUserRole } from "@/lib/auth-permissions";

import { findUserById, updateUserStatus } from "@/repositories/user.repository";

interface UpdateStatusInput {
    id: string;
    isActive: boolean;
}

export async function updateUserStatusAction(values: UpdateStatusInput) {
    try {
        const currentRole = await getCurrentUserRole();

        const targetUser = await findUserById(values.id);

        if (!targetUser) {
            return {
                success: false,
                message: "User tidak ditemukan.",
            };
        }

        if (!canEditUser(currentRole, targetUser.role)) {
            return {
                success: false,
                message: "Anda tidak memiliki izin mengubah status user ini.",
            };
        }

        await updateUserStatus(values.id, values.isActive);

        revalidatePath("/dashboard/super-admin/users");
        revalidatePath("/dashboard/admin/users");

        return {
            success: true,
            message: values.isActive ? "User berhasil diaktifkan." : "User berhasil dinonaktifkan.",
        };
    } catch (error) {
        console.error("UPDATE USER STATUS ERROR:", error);

        return {
            success: false,
            message: "Gagal mengubah status user.",
        };
    }
}
