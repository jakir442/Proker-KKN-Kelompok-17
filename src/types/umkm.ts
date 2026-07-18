import { Document } from "mongoose";

export interface IUMKM extends Document {
    name: string;
    slug: string;
    description: string;

    logo: string;
    gallery: string[];

    owner: string;

    whatsapp: string;

    category: string;

    address: string;

    latitude?: number;
    longitude?: number;

    openTime: string;
    closeTime: string;

    featured: boolean;
    isActive: boolean;

    createdAt: Date;
    updatedAt: Date;
}
