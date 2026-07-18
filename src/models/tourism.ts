import { TOURISM_CATEGORIES } from "@/constants/tourism";
import mongoose, { InferSchemaType, Model, Schema } from "mongoose";

const tourismSchema = new Schema(
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

        shortDescription: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            required: true,
        },

        gallery: {
            type: [String],
            default: [],
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        latitude: {
            type: Number,
        },

        longitude: {
            type: Number,
        },

        category: {
            type: String,
            enum: TOURISM_CATEGORIES,
            required: true,
        },

        facilities: {
            type: [String],
            default: [],
        },

        openingHours: {
            type: String,
            default: "",
        },

        ticketPrice: {
            type: Number,
            default: 0,
            min: 0,
        },

        contact: {
            type: String,
            default: "",
        },

        featured: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["published", "draft"],
            default: "draft",
        },
    },
    {
        timestamps: true,
    },
);

tourismSchema.index({
    name: "text",
    shortDescription: "text",
    description: "text",
    address: "text",
});

export type TourismDocument = InferSchemaType<typeof tourismSchema>;

export const TourismModel: Model<TourismDocument> =
    mongoose.models.Tourism || mongoose.model<TourismDocument>("Tourism", tourismSchema);
