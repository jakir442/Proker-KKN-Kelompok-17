"use server";

import { revalidatePath } from "next/cache";
import { createGallery, findGalleryBySlug } from "@/repositories/gallery.repository";
import { generateSlug } from "@/lib/slug";
import { gallerySchema } from "@/validations/gallery.schema";

import type { ActionResult } from "@/actions/shared/action-result";
import type { GalleryInput } from "@/validations/gallery.schema";

export async function createGalleryAction(input: GalleryInput): Promise<ActionResult> {
    const parsed = gallerySchema.safeParse(input);

    if (!parsed.success) {
        return {
            success: false,
            message: parsed.error.issues[0].message,
        };
    }

    const slug = generateSlug(parsed.data.title);

    const exists = await findGalleryBySlug(slug);

    if (exists) {
        return {
            success: false,
            message: "Judul galeri sudah digunakan.",
        };
    }

    console.log("=== CREATE GALLERY ===");
    console.log(parsed.data);

    await createGallery({
        ...parsed.data,
        slug,
    });

    revalidatePath("/dashboard/galeri");
    revalidatePath("/galeri");

    return {
        success: true,
        message: "Foto galeri berhasil ditambahkan.",
    };
}
