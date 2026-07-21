import { Schema, model, models } from "mongoose";

import type { IUMKM } from "@/types/umkm";

const UMKMSchema = new Schema<IUMKM>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        logo: {
            type: String,
            default: "",
        },

        gallery: {
            type: [String],
            default: [],
        },

        owner: {
            type: String,
            required: true,
            trim: true,
        },

        whatsapp: {
            type: String,
            default: "",
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        },

        address: {
            type: String,
            required: true,
        },

        latitude: {
            type: Number,
            default: null,
        },

        longitude: {
            type: Number,
            default: null,
        },

        openTime: {
            type: String,
            default: "",
        },

        closeTime: {
            type: String,
            default: "",
        },

        featured: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        collection: "umkm",
    },
);

UMKMSchema.index({ slug: 1 });
UMKMSchema.index({ category: 1 });
UMKMSchema.index({ featured: 1 });
UMKMSchema.index({ isActive: 1 });

export const UMKM = models.UMKM ?? model<IUMKM>("UMKM", UMKMSchema);
