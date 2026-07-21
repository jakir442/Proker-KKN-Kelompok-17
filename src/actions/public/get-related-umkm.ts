"use server";

import { findRelatedUMKM } from "@/repositories/umkm.repository";

export async function getRelatedUMKMAction(category: string, slug: string) {
    try {
        const data = await findRelatedUMKM(category, slug);

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            data: [],
        };
    }
}
