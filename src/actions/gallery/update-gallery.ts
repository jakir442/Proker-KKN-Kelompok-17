"use server";

import { revalidatePath } from "next/cache";

import {
    findGalleryBySlug,
    findGalleryById,
    updateGallery,
} from "@/repositories/gallery.repository";

import { gallerySchema } from "@/validations/gallery.schema";

import { generateSlug } from "@/lib/slug";

import type { ActionResult } from "@/actions/shared/action-result";
import type { GalleryInput } from "@/validations/gallery.schema";

export async function updateGalleryAction(id: string, input: GalleryInput): Promise<ActionResult> {
    const parsed = gallerySchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const currentGallery = await findGalleryById(id);

    if (!currentGallery) {
        return {
            success: false,
            message: "Galeri tidak ditemukan.",
        };
    }

    const slug = generateSlug(parsed.data.title);

    if (slug !== currentGallery.slug) {
        const exists = await findGalleryBySlug(slug);

        if (exists) {
            return {
                success: false,
                message: "Judul galeri sudah digunakan.",
            };
        }
    }

    await updateGallery(id, {
        ...parsed.data,
        slug,
    });

    revalidatePath("/dashboard/galeri");
    revalidatePath("/galeri");

    return {
        success: true,
        message: "Galeri berhasil diperbarui.",
    };
}
