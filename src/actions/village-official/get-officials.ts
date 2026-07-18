"use server";

import { findAll } from "@/repositories/village-official.repository";

interface GetOfficialsParams {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export async function getOfficialsAction({
    search = "",
    status,
    page = 1,
    limit = 10,
}: GetOfficialsParams) {
    try {
        const result = await findAll();

        let data = result;

        // Search
        if (search) {
            const keyword = search.toLowerCase();

            data = data.filter(
                (item) =>
                    item.name.toLowerCase().includes(keyword) ||
                    item.position.toLowerCase().includes(keyword),
            );
        }

        // Status
        if (status && status !== "ALL") {
            const active = status === "ACTIVE";

            data = data.filter((item) => item.isActive === active);
        }

        const mapped = data.map((item) => ({
            id: item._id!.toString(),

            name: item.name,

            position: item.position,

            photo: item.photo,

            phone: item.phone,

            email: item.email,

            order: item.order,

            isActive: item.isActive,

            createdAt: item.createdAt?.toISOString() ?? "",

            updatedAt: item.updatedAt?.toISOString() ?? "",
        }));

        return {
            success: true,
            data: mapped,
            total: mapped.length,
            page,
            totalPages: Math.ceil(mapped.length / limit),
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data perangkat desa.",
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }
}
