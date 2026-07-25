"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";

interface UpdateStatusInput {
    id: string;
    isActive: boolean;
}


export async function updateUserStatusAction(
    values: UpdateStatusInput
) {
    try {

        await connectDB();
        await User.findByIdAndUpdate(
            values.id,
            {
                isActive: values.isActive,
            }
        );
        revalidatePath("/dashboard/super-admin/users");
        return {
            success: true,
            message: values.isActive
                ? "User berhasil diaktifkan"
                : "User berhasil dinonaktifkan",
        };
    } catch {
        return {
            success: false,
            message: "Gagal mengubah status user",
        };
    }
}