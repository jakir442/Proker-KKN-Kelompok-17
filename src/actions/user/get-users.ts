import { getUsers } from "@/repositories/user.repository";

interface GetUsersActionParams {
    search?: string;
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export async function getUsersAction({
    search = "",
    role = "ALL",
    status = "ALL",
    page = 1,
    limit = 10,
}: GetUsersActionParams = {}) {
    try {
        const result = await getUsers({
            search,
            role,
            status,
            page,
            limit,
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
        console.error(error);

        return {
            success: false,
            data: [],
            total: 0,
            message: "Gagal mengambil data pengguna.",
        };
    }
}
