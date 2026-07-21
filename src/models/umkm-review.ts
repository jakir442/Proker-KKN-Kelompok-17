import { Schema, model, models } from "mongoose";

const UMKMReviewSchema = new Schema(
    {
        umkmId: {
            type: Schema.Types.ObjectId,
            ref: "UMKM",
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        comment: {
            type: String,
            required: true,
            trim: true,
        },

        isPublished: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "umkm_reviews",
    },
);

UMKMReviewSchema.index({
    umkmId: 1,
});

export const UMKMReview = models.UMKMReview ?? model("UMKMReview", UMKMReviewSchema);
