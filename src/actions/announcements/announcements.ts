"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";
import {
    createAnnouncement,
    deleteAnnouncement,
    findAnnouncementById,
    updateAnnouncement,
} from "@/repositories/announcement.repository";
import { auth } from "@/auth";
import { Types } from "mongoose";

type AnnouncementCategory =
    | "Umum"
    | "Pelayanan"
    | "Kesehatan"
    | "Pendidikan"
    | "Darurat"
    | "Lainnya";

interface CreateAnnouncementInput {
    title: string;
    excerpt: string;
    content: string;
    category: AnnouncementCategory;
    coverImage: string;
    published: boolean;
}

interface UpdateAnnouncementInput {
    title: string;
    excerpt: string;
    content: string;
    category: AnnouncementCategory;
    coverImage: string;
    published: boolean;
}

export async function createAnnouncementAction(data: CreateAnnouncementInput) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return {
                success: false,
                message: "Anda harus login terlebih dahulu.",
            };
        }

        const slug = slugify(data.title, {
            lower: true,
            strict: true,
            trim: true,
        });

        await createAnnouncement({
            title: data.title,
            slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            coverImage: data.coverImage,
            published: data.published,
            publishedAt: data.published ? new Date() : null,
            createdBy: new Types.ObjectId(session.user.id),
        });

        revalidatePath("/dashboard/announcements");
        revalidatePath("/pengumuman");

        return {
            success: true,
            message: "Pengumuman berhasil ditambahkan.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menambahkan pengumuman.",
        };
    }
}

export async function updateAnnouncementAction(id: string, data: UpdateAnnouncementInput) {
    try {
        const slug = slugify(data.title, {
            lower: true,
            strict: true,
            trim: true,
        });

        const announcement = await findAnnouncementById(id);

        if (!announcement) {
            return {
                success: false,
                message: "Pengumuman tidak ditemukan.",
            };
        }

        await updateAnnouncement(id, {
            title: data.title,
            slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            coverImage: data.coverImage,
            published: data.published,
            publishedAt:
                data.published && !announcement.published ? new Date() : announcement.publishedAt,
        });

        revalidatePath("/dashboard/announcements");
        revalidatePath("/pengumuman");

        return {
            success: true,
            message: "Pengumuman berhasil diperbarui.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal memperbarui pengumuman.",
        };
    }
}

export async function deleteAnnouncementAction(id: string) {
    try {
        await deleteAnnouncement(id);

        revalidatePath("/dashboard/announcements");
        revalidatePath("/pengumuman");

        return {
            success: true,
            message: "Pengumuman berhasil dihapus.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal menghapus pengumuman.",
        };
    }
}

export async function toggleAnnouncementPublishAction(id: string, published: boolean) {
    try {
        await updateAnnouncement(id, {
            published,
            publishedAt: published ? new Date() : null,
        });

        revalidatePath("/dashboard/announcements");
        revalidatePath("/pengumuman");

        return {
            success: true,
            message: published
                ? "Pengumuman berhasil dipublikasikan."
                : "Pengumuman dijadikan draft.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Gagal mengubah status pengumuman.",
        };
    }
}
