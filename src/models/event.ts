import { HydratedDocument, InferSchemaType, Model, Schema, model, models } from "mongoose";

const eventSchema = new Schema(
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
            required: true,
        },

        coverImage: {
            type: String,
            default: "",
        },

        location: {
            type: String,
            required: true,
            trim: true,
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

        startTime: {
            type: String,
            default: "",
        },

        endTime: {
            type: String,
            default: "",
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
