"use server";

import { findEvents } from "@/repositories/event.repository";

interface GetEventsParams {
    search?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export async function getEventsAction({
    search = "",
    status = "ALL",
    page = 1,
    limit = 10,
}: GetEventsParams) {
    try {
        const result = await findEvents({
            page,
            limit,
            search,
            published: status === "ALL" ? undefined : status === "PUBLISHED",
        });

        const mapped = result.events.map((item) => ({
            id: item._id.toString(),

            title: item.title,
            slug: item.slug,

            description: item.description,

            coverImage: item.coverImage,

            location: item.location,

            startDate: item.startDate.toISOString(),
            endDate: item.endDate.toISOString(),

            startTime: item.startTime,
            endTime: item.endTime,

            organizer: item.organizer,
            contact: item.contact,

            published: item.published,

            publishedAt: item.publishedAt ? item.publishedAt.toISOString() : null,

            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
        }));

        return {
            success: true,
            data: mapped,
            total: result.pagination.total,
            page: result.pagination.page,
            totalPages: result.pagination.totalPages,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data agenda desa.",
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }
}
