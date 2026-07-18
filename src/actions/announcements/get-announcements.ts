"use server";

import { findAnnouncements } from "@/repositories/announcement.repository";

interface GetAnnouncementsParams {
    search?: string;
    category?: string;
    status?: string;
    page?: number;
    limit?: number;
}

export async function getAnnouncementsAction({
    search = "",
    category,
    status = "ALL",
    page = 1,
    limit = 10,
}: GetAnnouncementsParams) {
    try {
        const result = await findAnnouncements({
            page,
            limit,
            search,
            category: category === "ALL" ? undefined : category,
            published: status === "ALL" ? undefined : status === "PUBLISHED",
        });

        const mapped = result.announcements.map((item) => ({
            id: item._id.toString(),

            title: item.title,
            slug: item.slug,

            excerpt: item.excerpt,

            category: item.category,

            coverImage: item.coverImage,

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
            message: "Gagal mengambil data pengumuman.",
            data: [],
            total: 0,
            page: 1,
            totalPages: 1,
        };
    }
}
