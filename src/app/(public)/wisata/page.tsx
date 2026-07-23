import type { Metadata } from "next";
import { findPublishedTourism } from "@/repositories/tourism.repository";
import { Container } from "@/components/public/layout/Container";
import { TourismHero } from "@/components/public/tourism/TourismHero";
import { TourismGrid } from "@/components/public/tourism/TourismGrid";
import { TourismPagination } from "@/components/public/tourism/TourismPagination";
import { TourismEmpty } from "@/components/public/tourism/TourismEmpty";
import { TourismSearch } from "@/components/public/tourism/TourismSearch";
import { TourismFilter } from "@/components/public/tourism/TourismFilter";

interface Props {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category?: string;
    }>;
}

export const metadata: Metadata = {
    title: "Wisata Desa",
    description: "Jelajahi destinasi wisata terbaik yang dimiliki Desa Cintanagara.",
};

export default async function TourismPage({ searchParams }: Props) {
    const params = await searchParams;
    const page = Number(params.page ?? 1);
    const result = await findPublishedTourism({
        page,
        limit: 5,
        search: params.search,
        category: params.category,
    });
    const heroItem = result.tourism[0];
    const totalTourism = result.totalItems;

    return (
        <>
            {heroItem && <TourismHero item={heroItem} totalTourism={totalTourism} />}
            <section className="border-b bg-muted/30">
                <Container className="space-y-6 py-8">
                    <TourismSearch />
                    <TourismFilter />
                </Container>
            </section>
            <section className="py-16 md:py-20">
                <Container>
                    {result.tourism.length > 0 ? (
                        <>
                            <TourismGrid tourism={result.tourism} />
                            <TourismPagination page={result.page} totalPages={result.totalPages} />
                        </>
                    ) : (
                        <TourismEmpty />
                    )}
                </Container>
            </section>
        </>
    );
}
