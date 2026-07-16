"use server";

import { findCompletedEvents } from "@/repositories/event.repository";

export async function getCompletedEventsAction(limit = 10) {
    try {
        const events = await findCompletedEvents(limit);

        return {
            success: true,
            data: events.map((item) => ({
                id: item._id.toString(),

                title: item.title,
                slug: item.slug,

                description: item.description,
                location: item.location,

                coverImage: item.coverImage,

                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),

                published: item.published,

                createdAt: item.createdAt.toISOString(),
                updatedAt: item.updatedAt.toISOString(),
            })),
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil agenda yang telah selesai.",
            data: [],
        };
    }
}
