import { getLatestNews } from "@/repositories/news.repository";

import { Container } from "../layout/Container";
import { SectionHeader } from "../common/SectionHeader";
import { NewsCard } from "./NewsCard";

export async function LatestNews() {
    const news = await getLatestNews(3);

    const latestNews = news.map((item) => ({
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
        <section className="py-24">
            <Container>
                <SectionHeader
                    badge="Berita Desa"
                    title="Berita Terbaru"
                    description="Ikuti perkembangan terbaru mengenai kegiatan, program, dan informasi penting Desa Cintanagara."
                />

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {latestNews.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
