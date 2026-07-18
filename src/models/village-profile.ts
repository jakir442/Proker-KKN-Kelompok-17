import { model, models, Schema } from "mongoose";

export interface IVillageProfile {
    _id?: string;

    about: string;
    history: string;

    vision: string;

    mission: string[];

    headmanName: string;
    headmanPhoto?: string;
    headmanGreeting: string;

    area: number;

    population: number;

    households: number;

    rt: number;

    rw: number;

    hamlets: number;

    latitude: number;
    longitude: number;

    createdAt?: Date;
    updatedAt?: Date;
}

const villageProfileSchema = new Schema<IVillageProfile>(
    {
        about: {
            type: String,
            required: true,
            trim: true,
        },

        history: {
            type: String,
            required: true,
            trim: true,
        },

        vision: {
            type: String,
            required: true,
            trim: true,
        },

        mission: [
            {
                type: String,
                required: true,
                trim: true,
            },
        ],

        headmanName: {
            type: String,
            required: true,
            trim: true,
        },

        headmanPhoto: {
            type: String,
            default: "",
        },

        headmanGreeting: {
            type: String,
            required: true,
        },

        area: {
            type: Number,
            required: true,
            min: 0,
        },

        population: {
            type: Number,
            required: true,
            min: 0,
        },

        households: {
            type: Number,
            required: true,
            min: 0,
        },

        rt: {
            type: Number,
            required: true,
            min: 0,
        },

        rw: {
            type: Number,
            required: true,
            min: 0,
        },

        hamlets: {
            type: Number,
            required: true,
            min: 0,
        },

        latitude: {
            type: Number,
            required: true,
        },

        longitude: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const VillageProfile =
    models.VillageProfile || model<IVillageProfile>("VillageProfile", villageProfileSchema);
