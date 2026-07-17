import { APBDesStatus } from "@/constants/apbdes";
import { InferSchemaType, Model, model, models, Schema } from "mongoose";

const APBDesSchema = new Schema(
    {
        year: {
            type: Number,
            required: true,
            min: 2000,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        status: {
            type: String,
            enum: Object.values(APBDesStatus),
            default: APBDesStatus.DRAFT,
        },
    },
    {
        timestamps: true,
    },
);

APBDesSchema.index({ year: 1 }, { unique: true });

export type IAPBDes = InferSchemaType<typeof APBDesSchema>;

export const APBDes: Model<IAPBDes> = models.APBDes || model<IAPBDes>("APBDes", APBDesSchema);
