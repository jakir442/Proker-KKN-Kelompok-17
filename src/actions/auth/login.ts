"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { loginSchema } from "@/validations/login.schema";
import { failed } from "@/lib/action-response";

export async function loginAction(formData: FormData) {
    const validated = loginSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });

    if (!validated.success) {
        return failed("Data login tidak valid.");
    }

    try {
        await signIn("credentials", {
            username: validated.data.username,
            password: validated.data.password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return failed("Username atau password salah.");
        }

        throw error;
    }
}
