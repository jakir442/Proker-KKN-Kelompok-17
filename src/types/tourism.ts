import type { Types } from "mongoose";

export interface ITourism {
    _id: Types.ObjectId;
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    image: string;
    gallery: string[];
    address: string;
    latitude?: number | null;
    longitude?: number | null;
    category: "Alam" | "Budaya" | "Religi" | "Edukasi" | "Kuliner" | "Camping";
    facilities: string[];
    openingHours?: string;
    ticketPrice?: number;
    contact?: string;
    featured: boolean;
    status: "published" | "draft";
    createdAt: Date;
    updatedAt: Date;
}
