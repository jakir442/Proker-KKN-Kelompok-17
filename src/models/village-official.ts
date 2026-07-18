import { model, models, Schema } from "mongoose";

export interface IVillageOfficial {
    _id?: string;

    name: string;

    position: string;

    photo?: string;

    phone?: string;

    email?: string;

    order: number;

    isActive: boolean;

    createdAt?: Date;

    updatedAt?: Date;
}

const villageOfficialSchema = new Schema<IVillageOfficial>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        position: {
            type: String,
            required: true,
            trim: true,
        },

        photo: {
            type: String,
            default: "",
        },

        phone: {
            type: String,
            default: "",
        },

        email: {
            type: String,
            default: "",
            lowercase: true,
            trim: true,
        },

        order: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

export const VillageOfficial =
    models.VillageOfficial || model<IVillageOfficial>("VillageOfficial", villageOfficialSchema);
