import { HydratedDocument, InferSchemaType, Model, Schema, model, models } from "mongoose";

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 150,
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
            required: true,
            maxlength: 5000,
        },

        coverImage: {
            type: String,
            default: "",
        },

        location: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
            index: true,
        },

        latitude: {
            type: Number,
            required: true,
        },

        longitude: {
            type: Number,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
            index: true,
        },

        endDate: {
            type: Date,
            required: true,
            index: true,
        },

        organizer: {
            type: String,
            default: "",
            trim: true,
        },

        contact: {
            type: String,
            default: "",
            trim: true,
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

export type EventSchema = InferSchemaType<typeof eventSchema>;

export type IEvent = HydratedDocument<EventSchema>;

export const Event: Model<EventSchema> = models.Event || model<EventSchema>("Event", eventSchema);
