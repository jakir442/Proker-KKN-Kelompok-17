"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";

interface ResetPasswordInput {
    id: string;
    password: string;
}

export async function resetUserPasswordAction(values: ResetPasswordInput) {
    try {
        await connectDB();

        const hashedPassword = await bcrypt.hash(values.password, 10);

        const user = await User.findByIdAndUpdate(values.id, {
            password: hashedPassword,
        });

        if (!user) {
            return {
                success: false,
                message: "User tidak ditemukan",
            };
        }

        revalidatePath("/dashboard/super-admin/users");

        return {
            success: true,
            message: "Password user berhasil diperbarui",
        };
    } catch (error) {
        console.error("RESET PASSWORD ERROR:", error);

        return {
            success: false,
            message: "Gagal mengubah password user",
        };
    }
}
