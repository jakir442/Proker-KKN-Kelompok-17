import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        <section className="relative overflow-hidden py-20 sm:py-24">
            {/* Background Decoration */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/20 to-background" />
            <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <Container>
                <SectionHeader
                    badge="Berita Desa"
                    title="Berita Terbaru"
                    description="Ikuti perkembangan terbaru mengenai kegiatan, program, dan informasi penting Desa Cintanagara."
                />

                {latestNews.length > 0 ? (
                    <>
                        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {latestNews.map((item) => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center">
                            <Link
                                href="/berita"
                                className="group inline-flex items-center gap-2 rounded-full border bg-background px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-lg"
                            >
                                Lihat Semua Berita
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="mt-14 rounded-3xl border border-dashed bg-muted/30 px-8 py-16 text-center">
                        <h3 className="text-lg font-semibold">Belum ada berita</h3>
                        <p className="mt-2 text-muted-foreground">
                            Informasi terbaru dari Desa Cintanagara akan ditampilkan di sini.
                        </p>
                    </div>
                )}
            </Container>
        </section>
    );
}
