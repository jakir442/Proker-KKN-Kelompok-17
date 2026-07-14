"use server";

import { getAllServices } from "@/repositories/service.repository";

interface GetServicesParams {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export async function getServicesAction({
    search = "",
    status,
    page = 1,
    limit = 10,
}: GetServicesParams) {
    try {
        const result = await getAllServices();

        let data = result;

        // Search
        if (search) {
            const keyword = search.toLowerCase();

            data = data.filter(
                (item) =>
                    item.title.toLowerCase().includes(keyword) ||
                    item.description.toLowerCase().includes(keyword),
            );
        }

        // Status
        if (status && status !== "ALL") {
            const published = status === "PUBLISHED";

            data = data.filter((item) => item.isPublished === published);
        }

        const mapped = data.map((item) => ({
            id: item._id.toString(),

            title: item.title,
            slug: item.slug,

            description: item.description,

            requirements: item.requirements,

            process: item.process,

            duration: item.duration,

            fee: item.fee,

            icon: item.icon,

            isPublished: item.isPublished,

            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
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
            message: "Gagal mengambil data layanan.",
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }
}
