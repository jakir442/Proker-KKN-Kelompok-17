"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { Types } from "mongoose";
import { auth } from "@/auth";
import {
    createEvent,
    deleteEvent,
    findEventById,
    updateEvent,
} from "@/repositories/event.repository";

interface CreateEventInput {
    title: string;
    description: string;
    location: string;
    coverImage: string;

    startDate: Date;
    endDate: Date;

    published: boolean;
}

interface UpdateEventInput {
    title: string;
    description: string;
    location: string;
    coverImage: string;

    startDate: Date;
    endDate: Date;

    published: boolean;
}

export async function createEventAction(data: CreateEventInput) {
    try {
        const slug = slugify(data.title, {
            lower: true,
            strict: true,
            trim: true,
        });
        const session = await auth();

        if (!session?.user?.id) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        await createEvent({
            title: data.title,
            slug,
            description: data.description,
            location: data.location,
            coverImage: data.coverImage,
            startDate: data.startDate,
            endDate: data.endDate,
            published: data.published,
            publishedAt: data.published ? new Date() : null,
            createdBy: new Types.ObjectId(session.user.id),
        });

        revalidatePath("/dashboard/events");
        revalidatePath("/agenda");

        return {
            success: true,
            message: "Agenda berhasil ditambahkan.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menambahkan agenda.",
        };
    }
}

export async function updateEventAction(id: string, data: UpdateEventInput) {
    try {
        const event = await findEventById(id);

        if (!event) {
            return {
                success: false,
                message: "Agenda tidak ditemukan.",
            };
        }

        const slug = slugify(data.title, {
            lower: true,
            strict: true,
            trim: true,
        });

        await updateEvent(id, {
            title: data.title,
            slug,
            description: data.description,
            location: data.location,
            coverImage: data.coverImage,

            startDate: data.startDate,
            endDate: data.endDate,

            published: data.published,
            publishedAt: data.published && !event.published ? new Date() : event.publishedAt,
        });

        revalidatePath("/dashboard/events");
        revalidatePath("/agenda");

        return {
            success: true,
            message: "Agenda berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal memperbarui agenda.",
        };
    }
}

export async function deleteEventAction(id: string) {
    try {
        await deleteEvent(id);

        revalidatePath("/dashboard/events");
        revalidatePath("/agenda");

        return {
            success: true,
            message: "Agenda berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menghapus agenda.",
        };
    }
}

export async function toggleEventPublishAction(id: string, published: boolean) {
    try {
        await updateEvent(id, {
            published,
            publishedAt: published ? new Date() : null,
        });

        revalidatePath("/dashboard/events");
        revalidatePath("/agenda");

        return {
            success: true,
            message: published ? "Agenda berhasil dipublikasikan." : "Agenda dijadikan draft.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengubah status agenda.",
        };
    }
}
