import { connectDB } from "@/lib/mongodb";
import { UMKMReview } from "@/models/umkm-review";

interface CreateReviewInput {
    umkmId: string;
    name: string;
    rating: number;
    comment: string;
}

export async function createUMKMReview(data: CreateReviewInput) {
    await connectDB();

    return UMKMReview.create(data);
}

export async function findUMKMReviews(umkmId: string) {
    await connectDB();

    return UMKMReview.find({
        umkmId,
    })
        .sort({
            createdAt: -1,
        })
        .lean();
}
