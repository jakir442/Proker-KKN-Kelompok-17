import { Schema, model, models } from "mongoose";

import { ROLES } from "@/constants/roles";
import type { IUser } from "@/types/user";

const UserSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: String,
            default: "",
        },

        address: {
            type: String,
            default: "",
        },

        avatar: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.WARGA,
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

UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });

export const User = models.User ?? model<IUser>("User", UserSchema);
