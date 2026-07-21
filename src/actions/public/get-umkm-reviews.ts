"use server";

import { findUMKMReviews } from "@/repositories/umkm-review.repository";

export async function getUMKMReviewsAction(umkmId: string) {
    try {
        const reviews = await findUMKMReviews(umkmId);

        return {
            success: true,
            data: JSON.parse(JSON.stringify(reviews)),
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            data: [],
        };
    }
}
