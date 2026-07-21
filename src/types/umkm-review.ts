import { HydratedDocument } from "mongoose";

export interface IUMKMReview {
    _id: string;
    umkmId: string;
    name: string;
    rating: number;
    comment: string;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type UMKMReviewDocument = HydratedDocument<IUMKMReview>;
