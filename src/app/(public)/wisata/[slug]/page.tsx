import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { TourismHero } from "@/components/public/tourism/TourismHero";
import { TourismMap } from "@/components/public/tourism/TourismMap";
import { findTourismBySlug } from "@/repositories/tourism.repository";
import { TourismGallery } from "@/components/public/tourism/TourismGallery";
import { TourismInformation } from "@/components/public/tourism/TourismInformation";
import { TourismFacilities } from "@/components/public/tourism/TourismFacilities";
import { TourismRelated } from "@/components/public/tourism/TourismRelated";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const tourism = await findTourismBySlug(slug);

    if (!tourism) {
        return {
            title: "Wisata Tidak Ditemukan",
        };
    }

    return {
        title: `${tourism.name} | Wisata Desa Cintanagara`,
        description: tourism.shortDescription,

        openGraph: {
            title: tourism.name,
            description: tourism.shortDescription,
            images: [tourism.image],
        },
    };
}

export default async function TourismDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const tourism = await findTourismBySlug(slug);

    if (!tourism) {
        notFound();
    }

    return (
        <>
            <TourismHero item={tourism} />
            <TourismGallery item={tourism} />
            <TourismInformation item={tourism} />
            <TourismFacilities item={tourism} />
            <TourismMap item={tourism} />
            <TourismRelated item={tourism} />
        </>
    );
}
