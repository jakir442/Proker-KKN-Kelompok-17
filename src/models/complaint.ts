import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComplaint extends Document {
    name: string;
    phone?: string;
    email?: string;

    title: string;
    description: string;

    category: "INFRASTRUKTUR" | "PELAYANAN" | "LINGKUNGAN" | "SOSIAL" | "LAINNYA";

    status: "PENDING" | "PROCESS" | "DONE" | "REJECTED";

    attachment?: string;
    response?: string;
    respondedAt?: Date;
    respondedBy?: string;
    ticketNumber: string;
    createdAt: Date;
    updatedAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["INFRASTRUKTUR", "PELAYANAN", "LINGKUNGAN", "SOSIAL", "LAINNYA"],
            default: "LAINNYA",
        },
        status: {
            type: String,
            enum: ["PENDING", "PROCESS", "DONE", "REJECTED"],
            default: "PENDING",
        },
        ticketNumber: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        attachment: {
            type: String,
            response: {
                type: String,
                default: "",
                trim: true,
            },

            respondedAt: {
                type: Date,
            },

            respondedBy: {
                type: String,
                trim: true,
            },
        },
    },
    {
        timestamps: true,
    },
);

export const Complaint: Model<IComplaint> =
    mongoose.models.Complaint || mongoose.model<IComplaint>("Complaint", ComplaintSchema);
