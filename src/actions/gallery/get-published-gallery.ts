"use server";

import { findPublishedGallery } from "@/repositories/gallery.repository";

export async function getPublishedGalleryAction() {
    try {
        const data = await findPublishedGallery();

        return {
            success: true,
            data,
        };
    } catch {
        return {
            success: false,
            message: "Gagal memuat galeri.",
            data: [],
        };
    }
}
