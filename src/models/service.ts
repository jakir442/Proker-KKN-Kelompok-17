import { Schema, model, models } from "mongoose";
import type { IService } from "@/types/service";

export type { IService };

const ServiceSchema = new Schema<IService>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        requirements: {
            type: [String],
            default: [],
        },

        process: {
            type: String,
            required: true,
        },

        duration: {
            type: String,
            required: true,
        },

        fee: {
            type: String,
            required: true,
        },

        icon: {
            type: String,
            default: "FileText",
        },

        isPublished: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

export const Service = models.Service || model<IService>("Service", ServiceSchema);
