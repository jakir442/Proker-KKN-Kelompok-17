import { HydratedDocument } from "mongoose";

export interface IUMKM {
    _id: string;

    name: string;
    slug: string;
    description: string;

    image?: string; // Cover utama UMKM
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

export type UMKMDocument = HydratedDocument<IUMKM>;
