import { Types } from "mongoose";

export interface IService {
    _id: string;
    title: string;
    slug: string;
    description: string;
    requirements: string[];
    process: string;
    duration: string;
    fee: string;
    icon: string;
    isPublished: boolean;
    createdBy?: Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IServiceInput {
    title: string;
    slug: string;
    description: string;
    requirements: string[];
    process: string;
    duration: string;
    fee: string;
    icon: string;
    isPublished: boolean;
}
