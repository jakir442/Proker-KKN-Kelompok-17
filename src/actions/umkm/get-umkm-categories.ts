"use server";

import { findUMKMCategories } from "@/repositories/umkm.repository";

export async function getUMKMCategoriesAction() {
    try {
        const data = await findUMKMCategories();

        return {
            success: true,
            data,
        };
    } catch (error) {
        console.error("GET UMKM CATEGORIES ERROR:", error);

        return {
            success: false,
            data: [],
        };
    }
}