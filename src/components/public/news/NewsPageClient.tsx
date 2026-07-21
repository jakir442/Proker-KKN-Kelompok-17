"use client";

import { useMemo, useState } from "react";

import { FadeIn } from "@/components/animations/FadeIn";
import { SearchInput } from "@/components/public/common/SearchInput";

import { News } from "@/types/news";

import { NewsGrid } from "./NewsGrid";
import { NewsPagination } from "./NewsPagination";

interface NewsPageClientProps {
    news: News[];
}

const ITEMS_PER_PAGE = 9;

export function NewsPageClient({ news }: NewsPageClientProps) {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const filteredNews = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        if (!keyword) return news;

        return news.filter(
            (item) =>
                item.title.toLowerCase().includes(keyword) ||
                item.excerpt.toLowerCase().includes(keyword) ||
                item.category.toLowerCase().includes(keyword),
        );
    }, [news, search]);

    const totalPages = Math.max(1, Math.ceil(filteredNews.length / ITEMS_PER_PAGE));

    const currentNews = useMemo(() => {
        const start = (page - 1) * ITEMS_PER_PAGE;

        return filteredNews.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredNews, page]);

    return (
        <section className="py-12 sm:py-16">
            <FadeIn>
                <div className="mx-auto max-w-2xl">
                    <SearchInput
                        value={search}
                        onChange={(value: string) => {
                            setSearch(value);
                            setPage(1);
                        }}
                        placeholder="Cari berita berdasarkan judul, kategori, atau kata kunci..."
                        debounce={300}
                    />
                </div>
            </FadeIn>

            <FadeIn delay={0.1}>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-semibold text-foreground">{filteredNews.length}</span>{" "}
                        berita
                    </p>

                    {search && (
                        <p className="text-sm text-muted-foreground">
                            Hasil pencarian:
                            <span className="ml-1 font-semibold text-primary">`{search}`</span>
                        </p>
                    )}
                </div>
            </FadeIn>

            <div className="mt-8">
                <NewsGrid news={currentNews} />
            </div>

            <NewsPagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </section>
    );
}
