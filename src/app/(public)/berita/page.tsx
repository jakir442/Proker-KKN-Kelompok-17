import { getAllNews } from "@/repositories/news.repository";

import { Container } from "@/components/public/layout/Container";
import { NewsHero } from "@/components/public/news/NewsHero";
import { NewsPageClient } from "@/components/public/news/NewsPageClient";

export default async function NewsPage() {
    const news = await getAllNews();

    const formattedNews = news.map((item) => ({
        id: item._id.toString(),
        slug: item.slug,
        category: item.category,
        title: item.title,
        image: item.image,
        excerpt: item.excerpt,
        date: new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(item.createdAt)),
    }));

    return (
        <>
            <NewsHero totalNews={formattedNews.length} />

            <Container>
                <NewsPageClient news={formattedNews} />
            </Container>
        </>
    );
}