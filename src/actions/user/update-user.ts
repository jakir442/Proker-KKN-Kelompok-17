"use server";

import { revalidatePath } from "next/cache";

import { canEditUser, getCurrentUserRole } from "@/lib/permissions";

import {
    findUserByEmailExceptId,
    findUserById,
    findUserByUsernameExceptId,
    updateUser,
} from "@/repositories/user.repository";

import { updateUserSchema } from "@/validations/update-user.schema";

export async function updateUserAction(input: unknown) {
    try {
        const parsed = updateUserSchema.safeParse(input);

        if (!parsed.success) {
            return {
                success: false,
                message: "Data tidak valid.",
            };
        }

        const data = parsed.data;

        const currentRole = await getCurrentUserRole();

        const targetUser = await findUserById(data.id);

        if (!targetUser) {
            return {
                success: false,
                message: "User tidak ditemukan.",
            };
        }

        if (!canEditUser(currentRole, targetUser.role)) {
            return {
                success: false,
                message: "Anda tidak memiliki izin mengubah user ini.",
            };
        }

        const existingUsername = await findUserByUsernameExceptId(data.username, data.id);

        if (existingUsername) {
            return {
                success: false,
                message: "Username sudah digunakan.",
            };
        }

        const existingEmail = await findUserByEmailExceptId(data.email, data.id);

        if (existingEmail) {
            return {
                success: false,
                message: "Email sudah digunakan.",
            };
        }

        await updateUser(data.id, {
            fullName: data.fullName,
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            role: data.role,
            isActive: data.isActive,
        });

        revalidatePath("/dashboard/super-admin/users");
        revalidatePath("/dashboard/admin/users");

        return {
            success: true,
            message: "User berhasil diperbarui.",
        };
    } catch (error) {
        console.error("UPDATE USER ERROR:", error);

        return {
            success: false,
            message: "Terjadi kesalahan pada server.",
        };
    }
}
