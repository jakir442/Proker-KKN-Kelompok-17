import { GALLERY_ALBUMS } from "@/constants/gallery";
import mongoose, { Document, Model, Schema } from "mongoose";

export type GalleryAlbum = (typeof GALLERY_ALBUMS)[number];

export interface IGallery extends Document {
    title: string;
    slug: string;
    description?: string;
    album: GalleryAlbum;
    image: string;
    takenAt: Date;
    isPublished: boolean;
    createdBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>(
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
        description: {
            type: String,
            default: "",
            trim: true,
        },
        album: {
            type: String,
            enum: GALLERY_ALBUMS,
            required: true,
            index: true,
        },
        image: {
            type: String,
            required: true,
        },
        takenAt: {
            type: Date,
            required: true,
            index: true,
        },
        isPublished: {
            type: Boolean,
            default: true,
            index: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

GallerySchema.index({
    title: "text",
    description: "text",
});

export const Gallery: Model<IGallery> =
    mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);
