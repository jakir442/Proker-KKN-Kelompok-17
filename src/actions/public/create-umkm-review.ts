"use server";

import { createUMKMReview } from "@/repositories/umkm-review.repository";

interface CreateReviewInput {
    umkmId: string;
    name: string;
    rating: number;
    comment: string;
}

export async function createUMKMReviewAction(data: CreateReviewInput) {
    try {
        if (!data.umkmId || !data.name.trim() || !data.comment.trim()) {
            return {
                success: false,
                message: "Data review tidak lengkap.",
            };
        }

        if (data.rating < 1 || data.rating > 5) {
            return {
                success: false,
                message: "Rating harus antara 1 sampai 5.",
            };
        }

        await createUMKMReview({
            umkmId: data.umkmId,
            name: data.name.trim(),
            rating: data.rating,
            comment: data.comment.trim(),
        });

        return {
            success: true,
            message: "Review berhasil dikirim.",
        };
    } catch (error) {
        console.error("CREATE UMKM REVIEW ERROR:", error);

        return {
            success: false,
            message: "Terjadi kesalahan saat mengirim review.",
        };
    }
}
