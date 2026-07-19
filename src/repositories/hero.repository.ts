import { unstable_cache } from "next/cache";

import { UMKM } from "@/models/umkm";
import { TourismModel } from "@/models/tourism";
import { News } from "@/models/news";
import { Service } from "@/models/service";

import { connectDB } from "@/lib/mongodb";

export interface HeroStatistics {
    totalUmkm: number;
    totalTourism: number;
    totalNews: number;
    totalServices: number;
}

export const getHeroStatistics = unstable_cache(
    async (): Promise<HeroStatistics> => {
        await connectDB();

        const [totalUmkm, totalTourism, totalNews, totalServices] = await Promise.all([
            UMKM.countDocuments(),
            TourismModel.countDocuments(),
            News.countDocuments(),
            Service.countDocuments(),
        ]);

        return {
            totalUmkm,
            totalTourism,
            totalNews,
            totalServices,
        };
    },
    ["hero-statistics"],
    {
        revalidate: 300, // 5 menit
    },
);
