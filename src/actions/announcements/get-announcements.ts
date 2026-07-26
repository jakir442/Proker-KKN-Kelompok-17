"use server";

import { findAnnouncements } from "@/repositories/announcement.repository";

type AnnouncementCategory =
    | "Umum"
    | "Pelayanan"
    | "Kesehatan"
    | "Pendidikan"
    | "Darurat"
    | "Lainnya";

interface GetAnnouncementsParams {
    search?: string;
    category?: AnnouncementCategory | "all";
    status?: "all" | "published" | "draft";
    page?: number;
    limit?: number;
}

export async function getAnnouncementsAction({
    search = "",
    category = "all",
    status = "all",
    page = 1,
    limit = 10,
}: GetAnnouncementsParams) {
    try {
        let published: boolean | undefined;

        switch (status) {
            case "published":
                published = true;
                break;
            case "draft":
                published = false;
                break;
            default:
                published = undefined;
        }

        const result = await findAnnouncements({
            page,
            limit,
            search,
            category: category === "all" ? undefined : category,
            published,
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
            limit,
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
            limit,
            totalPages: 1,
        };
    }
}
