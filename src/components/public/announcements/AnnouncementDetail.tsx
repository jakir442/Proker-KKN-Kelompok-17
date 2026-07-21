import Image from "next/image";
import { CalendarDays, Tag } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ShareActions } from "./ShareActions";

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
        <div className="grid gap-8 xl:grid-cols-[84px_minmax(0,1fr)]">
            {/* Share */}
            <ShareActions
                title={title}
                category={category}
                content={content}
                coverImage={coverImage}
                publishedAt={publishedAt}
            />

            {/* Article */}
            <article
                id="announcement-print"
                className="mx-auto w-full max-w-5xl rounded-[2rem] border border-border/60 bg-background p-6 shadow-sm sm:p-8 lg:p-10"
            >
                {/* Header */}
                <header className="space-y-8 text-center">
                    <Badge
                        variant="secondary"
                        className="rounded-full px-5 py-1.5 text-sm font-semibold"
                    >
                        {category}
                    </Badge>

                    <h1 className="mx-auto max-w-4xl text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        {title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            <span>{date}</span>
                        </div>

                        <div className="hidden h-4 w-px bg-border sm:block" />

                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-primary" />
                            <span>{category}</span>
                        </div>
                    </div>
                </header>

                {/* Hero */}
                <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/60 shadow-xl">
                    <div className="relative h-[260px] sm:h-[360px] lg:h-[520px]">
                        <Image
                            src={coverImage}
                            alt={title}
                            fill
                            priority
                            className="object-cover transition duration-700"
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                </div>

                {/* Divider */}
                <div className="mx-auto my-14 h-px w-40 bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Content */}
                <div
                    className="
                        prose
                        prose-neutral
                        dark:prose-invert
                        max-w-none

                        [&_*]:break-words
                        [&_*]:overflow-wrap-anywhere

                        break-words
                        overflow-hidden
                        [&_*>*]:max-w-full
                        [&_*>*]:break-words
                        [&_*>*]:overflow-wrap-anywhere

                        prose-pre:overflow-x-auto
                        prose-code:break-all

                        prose-img:max-w-full
                        prose-img:w-full

                        prose-headings:scroll-mt-24
                        prose-headings:font-bold
                        prose-headings:tracking-tight

                        prose-h2:text-3xl
                        prose-h3:text-2xl

                        prose-p:text-[17px]
                        prose-p:leading-9

                        prose-li:text-[17px]
                        prose-li:leading-9

                        prose-blockquote:border-primary
                        prose-blockquote:text-muted-foreground

                        prose-img:rounded-2xl
                        prose-img:shadow-lg

                        prose-a:text-primary
                        prose-a:no-underline
                        hover:prose-a:underline
                    "
                    dangerouslySetInnerHTML={{
                        __html: content.replace(/\n/g, "<br />"),
                    }}
                />
            </article>
        </div>
    );
}
