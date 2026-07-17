import { BudgetCategory } from "@/constants/apbdes";
import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const APBDesItemSchema = new Schema(
    {
        apbdesId: {
            type: Schema.Types.ObjectId,
            ref: "APBDes",
            required: true,
            index: true,
        },

        category: {
            type: String,
            enum: Object.values(BudgetCategory),
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        budget: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        realization: {
            type: Number,
            default: 0,
            min: 0,
        },

        notes: {
            type: String,
            default: "",
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

APBDesItemSchema.index({
    apbdesId: 1,
    category: 1,
});

export type IAPBDesItem = InferSchemaType<typeof APBDesItemSchema>;

export const APBDesItem: Model<IAPBDesItem> =
    models.APBDesItem || model<IAPBDesItem>("APBDesItem", APBDesItemSchema);
