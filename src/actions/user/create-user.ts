"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { createUser, findUserByEmail, findUserByUsername } from "@/repositories/user.repository";
import { createUserSchema } from "@/validations/user.schema";

export async function createUserAction(values: unknown) {
    try {
        const validated = createUserSchema.safeParse(values);

        if (!validated.success) {
            return {
                success: false,
                message: "Data tidak valid.",
            };
        }

        const data = validated.data;

        const existingUsername = await findUserByUsername(data.username);

        if (existingUsername) {
            return {
                success: false,
                message: "Username sudah digunakan.",
            };
        }

        const existingEmail = await findUserByEmail(data.email);

        if (existingEmail) {
            return {
                success: false,
                message: "Email sudah digunakan.",
            };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await createUser({
            ...data,
            password: hashedPassword,
        });

        revalidatePath("/dashboard/users");

        return {
            success: true,
            message: "User berhasil ditambahkan.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Terjadi kesalahan pada server.",
        };
    }
}
