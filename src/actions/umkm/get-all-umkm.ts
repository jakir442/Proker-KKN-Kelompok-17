"use server";

import { findAllUMKM } from "@/repositories/umkm.repository";

interface GetAllUMKMParams {
    search?: string;
    category?: string;
    status?: "ACTIVE" | "INACTIVE";
    sort?: "newest" | "oldest" | "name" | "rating";
    page?: number;
    limit?: number;
}

export async function getAllUMKMAction(params: GetAllUMKMParams = {}) {
    try {
        const data = await findAllUMKM({
            search: params.search,
            category: params.category,
            status: params.status,
            sort: params.sort,
            page: params.page,
            limit: params.limit,
        });

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("GET ALL UMKM ERROR:", error);

        return {
            success: false,
            data: {
                items: [],
                total: 0,
                totalPages: 0,
                page: 1,
            },
            message: "Gagal mengambil data UMKM.",
        };
    }
}