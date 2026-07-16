"use server";

import { findEventBySlug } from "@/repositories/event.repository";

export async function getEventBySlugAction(slug: string) {
    try {
        const event = await findEventBySlug(slug);

        if (!event) {
            return {
                success: false,
                data: null,
            };
        }

        return {
            success: true,
            data: {
                id: event.id,

                title: event.title,
                slug: event.slug,

                description: event.description,

                coverImage: event.coverImage,

                location: event.location,

                startDate: event.startDate.toISOString(),
                endDate: event.endDate.toISOString(),

                published: event.published,
            },
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            data: null,
        };
    }
}
