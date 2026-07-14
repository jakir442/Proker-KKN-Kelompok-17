"use server";

import { findGalleryBySlug } from "@/repositories/gallery.repository";

export async function getGalleryBySlugAction(slug: string) {
    return findGalleryBySlug(slug);
}
