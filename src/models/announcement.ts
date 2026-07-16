import { ANNOUNCEMENT_CATEGORIES } from "@/constants/announcements";
import { InferSchemaType, Model, Schema, Types, model, models } from "mongoose";

const announcementSchema = new Schema(
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
            index: true,
        },

        excerpt: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: ANNOUNCEMENT_CATEGORIES,
            default: "Umum",
        },

        coverImage: {
            type: String,
            default: "",
        },

        published: {
            type: Boolean,
            default: false,
            index: true,
        },

        publishedAt: {
            type: Date,
            default: null,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

type AnnouncementSchema = InferSchemaType<typeof announcementSchema>;

export interface IAnnouncement extends Omit<AnnouncementSchema, "createdBy"> {
    createdBy: Types.ObjectId | string;
}

export const Announcement: Model<IAnnouncement> =
    models.Announcement || model<IAnnouncement>("Announcement", announcementSchema);
