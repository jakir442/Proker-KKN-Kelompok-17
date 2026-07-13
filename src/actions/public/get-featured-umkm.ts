"use server";

import { findFeaturedUMKM } from "@/repositories/umkm.repository";

export async function getFeaturedUMKMAction() {
    try {
        const data = await findFeaturedUMKM(6);

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
