"use server";

import { findAllGallery } from "@/repositories/gallery.repository";

interface GetGalleryParams {
    page?: number;
    limit?: number;
    search?: string;
    album?: string;
    published?: boolean;
}

export async function getGalleryAction({
    page = 1,
    limit = 10,
    search,
    album,
    published,
}: GetGalleryParams = {}) {
    return findAllGallery({
        page,
        limit,
        search,
        album,
        published,
    });
}
