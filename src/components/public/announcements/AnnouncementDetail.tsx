import Image from "next/image";
import { CalendarDays, Tag } from "lucide-react";

interface Props {
    title: string;
    content: string;
    category: string;
    coverImage: string;
    publishedAt: string;
}

export function AnnouncementDetail({ title, content, category, coverImage, publishedAt }: Props) {
    const date = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(publishedAt));

    return (
        <article className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        {category}
                    </span>

                    <span className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        {date}
                    </span>
                </div>

                <h1 className="text-4xl font-bold">{title}</h1>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image src={coverImage} alt={title} fill className="object-cover" />
            </div>

            <div
                className="prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                    __html: content.replace(/\n/g, "<br/>"),
                }}
            />
        </article>
    );
}
