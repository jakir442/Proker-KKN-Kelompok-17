import mongoose, { Schema, Model, Document } from "mongoose";

export interface INews extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
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
        excerpt: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        published: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: "news",
    },
);

export const News: Model<INews> = mongoose.models.News || mongoose.model<INews>("News", NewsSchema);
