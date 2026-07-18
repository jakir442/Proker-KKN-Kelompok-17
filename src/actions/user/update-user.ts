"use server";

import { revalidatePath } from "next/cache";
import { updateUserSchema } from "@/validations/update-user.schema";
import { updateUserById } from "@/repositories/user.repository";

export async function updateUserAction(input: unknown) {
    const parsed = updateUserSchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: "Data tidak valid",
        };
    }

    await updateUserById(parsed.data.id, {
        fullName: parsed.data.fullName,
        username: parsed.data.username,
        email: parsed.data.email,
        phoneNumber: parsed.data.phoneNumber,
        address: parsed.data.address,
        role: parsed.data.role,
        isActive: parsed.data.isActive,
    });

    revalidatePath("/dashboard/users");

    return {
        success: true,
        message: "User berhasil diperbarui",
    };
}
