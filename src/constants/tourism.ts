export const TOURISM_CATEGORIES = [
    "Alam",
    "Budaya",
    "Religi",
    "Edukasi",
    "Kuliner",
    "Camping",
] as const;

export const TOURISM_STATUS = ["published", "draft"] as const;

export type TourismCategory = (typeof TOURISM_CATEGORIES)[number];

export type TourismStatus = (typeof TOURISM_STATUS)[number];
