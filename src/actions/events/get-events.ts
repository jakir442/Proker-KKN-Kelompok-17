"use server";

import { findEventById, findEventBySlug } from "@/repositories/event.repository";

export async function getEventByIdAction(id: string) {
    try {
        const event = await findEventById(id);

        if (!event) {
            return {
                success: false,
                message: "Agenda tidak ditemukan.",
                data: null,
            };
        }

        return {
            success: true,
            data: {
                id: event._id.toString(),

                title: event.title,
                slug: event.slug,

                description: event.description,
                location: event.location,

                coverImage: event.coverImage,

                startDate: event.startDate.toISOString(),
                endDate: event.endDate.toISOString(),

                published: event.published,

                createdAt: event.createdAt.toISOString(),
                updatedAt: event.updatedAt.toISOString(),
            },
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data agenda.",
            data: null,
        };
    }
}

export async function getEventBySlugAction(slug: string) {
    try {
        const event = await findEventBySlug(slug);

        if (!event) {
            return {
                success: false,
                message: "Agenda tidak ditemukan.",
                data: null,
            };
        }

        return {
            success: true,
            data: {
                id: event._id.toString(),

                title: event.title,
                slug: event.slug,

                description: event.description,
                location: event.location,

                coverImage: event.coverImage,

                startDate: event.startDate.toISOString(),
                endDate: event.endDate.toISOString(),

                published: event.published,

                createdAt: event.createdAt.toISOString(),
                updatedAt: event.updatedAt.toISOString(),
            },
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengambil data agenda.",
            data: null,
        };
    }
}
