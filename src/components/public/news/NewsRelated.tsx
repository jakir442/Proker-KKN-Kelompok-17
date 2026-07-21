import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Stagger } from "@/components/animations/Stagger";
import { Button } from "@/components/ui/button";
import { News } from "@/types/news";
import { NewsCard } from "./NewsCard";

interface NewsRelatedProps {
    news: News[];
}

export function NewsRelated({ news }: NewsRelatedProps) {
    if (news.length === 0) {
        return null;
    }

    return (
        <section className="border-t bg-muted/20 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeIn>
                    <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                                Berita Terkait
                            </span>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Baca Artikel Lainnya
                            </h2>

                            <p className="mt-3 text-muted-foreground">
                                Temukan informasi terbaru mengenai kegiatan, program, dan pelayanan
                                Desa Cintanagara.
                            </p>
                        </div>

                        <Button variant="outline" className="rounded-xl">
                            <Link href="/berita">
                                Lihat Semua
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </FadeIn>

                <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {news.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
