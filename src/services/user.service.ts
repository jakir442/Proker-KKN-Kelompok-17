import bcrypt from "bcrypt";

import { createUser, findUserByUsername } from "@/repositories/user.repository";

import type { RegisterSchema } from "@/validations/register.schema";

export async function registerUser(data: RegisterSchema) {
    const existingUser = await findUserByUsername(data.username);

    if (existingUser) {
        throw new Error("Username sudah digunakan.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return createUser({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        phoneNumber: data.phoneNumber,
        address: data.address,
        role: "user",
        isActive: true,
    });
}

export async function authenticateUser(username: string, password: string) {
    const user = await findUserByUsername(username);

    if (!user) {
        return null;
    }

    if (!user.isActive) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return null;
    }

    return user;
}
