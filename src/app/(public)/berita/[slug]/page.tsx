import { Metadata } from "next";
import { notFound } from "next/navigation";

import { findNewsBySlug, getNewsNavigation, getRelatedNews } from "@/repositories/news.repository";

import { calculateReadingTime } from "@/lib/reading-time";

import { Container } from "@/components/public/layout/Container";
import { ReadingProgress } from "@/components/public/news/ReadingProgress";
import { NewsContent } from "@/components/public/news/NewsContent";
import { NewsDetailHero } from "@/components/public/news/NewsDetailHero";
import { NewsNavigation } from "@/components/public/news/NewsNavigation";
import { NewsShare } from "@/components/public/news/NewsShare";
import { NewsRelated } from "@/components/public/news/NewsRelated";
import { NewsBreadcrumb } from "@/components/public/news/NewsBreadcrumb";
import { NewsReadingInfo } from "@/components/public/news/NewsReadingInfo";
import { NewsAuthorCard } from "@/components/public/news/NewsAuthorCard";
import { BackToTop } from "@/components/public/news/BackToTop";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const news = await findNewsBySlug(slug);

    if (!news) {
        return {
            title: "Berita Tidak Ditemukan",
        };
    }

    return {
        title: `${news.title} | Cintanagara Smart Village`,
        description: news.excerpt,
        openGraph: {
            title: news.title,
            description: news.excerpt,
            images: [news.image],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: news.title,
            description: news.excerpt,
            images: [news.image],
        },
    };
}

export default async function NewsDetailPage({ params }: Props) {
    const { slug } = await params;
    const news = await findNewsBySlug(slug);
    if (!news) {
        notFound();
    }
    const [related, navigation] = await Promise.all([
        getRelatedNews(news._id.toString(), news.category, 3),
        getNewsNavigation(news.createdAt),
    ]);
    const relatedNews = related.map((item) => ({
        id: item._id.toString(),
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        image: item.image,
        category: item.category,
        date: new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(item.createdAt)),
    }));

    const url = `/berita/${news.slug}`;

    return (
        <>
            <ReadingProgress />
            <NewsBreadcrumb title={news.title} />
            <NewsDetailHero
                title={news.title}
                excerpt={news.excerpt}
                image={news.image}
                category={news.category}
                date={new Intl.DateTimeFormat("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                }).format(new Date(news.createdAt))}
                readingTime={calculateReadingTime(news.content)}
            />

            <Container className="py-20">
                <article className="mx-auto max-w-3xl">
                    <NewsReadingInfo
                        category={news.category}
                        date={new Intl.DateTimeFormat("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                        }).format(new Date(news.createdAt))}
                        readingTime={calculateReadingTime(news.content)}
                    />

                    <NewsContent content={news.content} />

                    <NewsAuthorCard />

                    <div className="my-16 border-t" />

                    <NewsShare title={news.title} url={url} />

                    <div className="mt-16">
                        <NewsNavigation
                            previous={
                                navigation.previous && {
                                    slug: navigation.previous.slug,
                                    title: navigation.previous.title,
                                }
                            }
                            next={
                                navigation.next && {
                                    slug: navigation.next.slug,
                                    title: navigation.next.title,
                                }
                            }
                        />
                    </div>
                </article>
            </Container>

            <section className="bg-muted/20 py-20">
                <Container>
                    <NewsRelated news={relatedNews} />
                </Container>
            </section>

            <BackToTop />
        </>
    );
}
