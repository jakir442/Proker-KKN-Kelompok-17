"use server";

import { findOngoingEvents } from "@/repositories/event.repository";

export async function getOngoingEventsAction() {
    try {
        const events = await findOngoingEvents();

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
            message: "Gagal mengambil agenda yang sedang berlangsung.",
            data: [],
        };
    }
}
