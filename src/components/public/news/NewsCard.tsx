import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { News } from "@/types/news";

interface NewsCardProps {
    news: News;
}

export function NewsCard({ news }: NewsCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-2 hover:shadow-xl">
            <div className="relative h-60 overflow-hidden">
                <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                />
            </div>

            <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    {news.date}
                </div>

                <h3 className="line-clamp-2 text-xl font-bold">{news.title}</h3>

                <p className="mt-3 line-clamp-3 text-slate-600">{news.excerpt}</p>

                <Button variant="link" className="mt-5 p-0 text-emerald-600">
                    <Link href={`/berita/${news.slug}`}>
                        Baca Selengkapnya
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </article>
    );
}
