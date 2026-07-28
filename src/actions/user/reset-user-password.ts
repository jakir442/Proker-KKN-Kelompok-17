"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { canEditUser } from "@/lib/permissions";
import { getCurrentUserRole } from "@/lib/auth-permissions";

import { findUserById, resetUserPassword } from "@/repositories/user.repository";

interface ResetPasswordInput {
    id: string;
    password: string;
}

export async function resetUserPasswordAction(values: ResetPasswordInput) {
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
                message: "Anda tidak memiliki izin mengubah password user ini.",
            };
        }

        const hashedPassword = await bcrypt.hash(values.password, 10);

        await resetUserPassword(values.id, hashedPassword);

        revalidatePath("/dashboard/super-admin/users");
        revalidatePath("/dashboard/admin/users");

        return {
            success: true,
            message: "Password user berhasil diperbarui.",
        };
    } catch (error) {
        console.error("RESET USER PASSWORD ERROR:", error);

        return {
            success: false,
            message: "Gagal mengubah password user.",
        };
    }
}
