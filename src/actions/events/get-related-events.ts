"use server";

import { findRelatedEvents } from "@/repositories/event.repository";

export async function getRelatedEventsAction(slug: string, limit = 3) {
    try {
        const events = await findRelatedEvents(slug, limit);

        return {
            success: true,
            data: events.map((item) => ({
                id: item.id,

                title: item.title,
                slug: item.slug,

                description: item.description,

                coverImage: item.coverImage,

                location: item.location,

                startDate: item.startDate.toISOString(),
                endDate: item.endDate.toISOString(),

                published: item.published,
            })),
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            data: [],
        };
    }
}
