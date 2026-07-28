"use server";

import { auth } from "@/auth";

import { getAllowedUserRoles } from "@/lib/permissions";
import { getCurrentUserRole } from "@/lib/auth-permissions";
import {
    getUsers,
    createUser,
    findUserByEmail,
    findUserByUsername,
} from "@/repositories/user.repository";
import type { UserRole } from "@/constants/roles";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

import { canCreateUser } from "@/lib/permissions";
import { createUserSchema } from "@/validations/user.schema";

interface GetUsersActionParams {
    search?: string;
    role?: "all" | UserRole;
    status?: "all" | "active" | "inactive";
    page?: number;
    limit?: number;
}

export async function getUsersAction({
    search = "",
    role = "all",
    status = "all",
    page = 1,
    limit = 10,
}: GetUsersActionParams = {}) {
    try {
        const session = await auth();

        if (!session?.user?.role) {
            return {
                success: false,
                data: [],
                total: 0,
                page: 1,
                limit,
                totalPages: 1,
                message: "Unauthorized.",
            };
        }

        const allowedRoles = getAllowedUserRoles(session.user.role, "view");

        const result = await getUsers({
            search,
            role,
            status,
            page,
            limit,
            allowedRoles,
        });

        return {
            success: true,
            data: result.users,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            message: "",
        };
    } catch (error) {
        console.error("GET USERS ERROR:", error);

        return {
            success: false,
            data: [],
            total: 0,
            page: 1,
            limit,
            totalPages: 1,
            message: "Gagal mengambil data pengguna.",
        };
    }
}

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

        const currentRole = await getCurrentUserRole();

        if (!canCreateUser(currentRole, data.role)) {
            return {
                success: false,
                message: "Anda tidak memiliki izin membuat role tersebut.",
            };
        }

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
