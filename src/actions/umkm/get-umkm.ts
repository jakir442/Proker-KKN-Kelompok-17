"use server";

import { findAllUMKM } from "@/repositories/umkm.repository";
import type { IUMKM } from "@/types/umkm";

interface GetUMKMParams {
    search?: string;
    category?: string;
    status?: "ACTIVE" | "INACTIVE";
    page?: number;
    limit?: number;
}

export async function getUMKMsAction({
    search = "",
    category,
    status,
    page = 1,
    limit = 10,
}: GetUMKMParams) {
    try {
        const result = await findAllUMKM({
            search,
            category,
            status,
        });

        const data = result.map((item: IUMKM) => ({
            id: item._id.toString(),

            name: item.name,
            slug: item.slug,
            description: item.description,

            logo: item.logo,
            gallery: item.gallery,

            owner: item.owner,
            whatsapp: item.whatsapp,

            category: item.category,
            address: item.address,

            latitude: item.latitude ?? null,
            longitude: item.longitude ?? null,

            openTime: item.openTime,
            closeTime: item.closeTime,

            featured: item.featured,
            isActive: item.isActive,

            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
        }));

        return {
            success: true,
            data,
            total: data.length,
            page,
            totalPages: Math.ceil(data.length / limit),
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data UMKM.",
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }
}
