"use server";

import { findUMKMBySlug } from "@/repositories/umkm.repository";

export async function getUMKMBySlugAction(slug: string) {
    try {
        const data = await findUMKMBySlug(slug);

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            data: null,
        };
    }
}
