"use server";

import { findAllTourism } from "@/repositories/tourism.repository";

import type { ITourism } from "@/types/tourism";

interface GetTourismsParams {
    search?: string;
    category?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export async function getTourismsAction({
    search = "",
    category,
    status,
    page = 1,
    limit = 10,
}: GetTourismsParams) {
    try {
        const result = await findAllTourism({
            search,
            category,
            status,
        });

        const data = result.map((item) => ({
            id: item._id.toString(),

            name: item.name,
            slug: item.slug,

            shortDescription: item.shortDescription,
            description: item.description,

            image: item.image,
            gallery: item.gallery,

            address: item.address,

            latitude: item.latitude ?? null,
            longitude: item.longitude ?? null,

            category: item.category,

            facilities: item.facilities,

            openingHours: item.openingHours,

            ticketPrice: item.ticketPrice,

            contact: item.contact,

            featured: item.featured,

            status: item.status,

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
            message: "Gagal mengambil data wisata.",
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }
}
