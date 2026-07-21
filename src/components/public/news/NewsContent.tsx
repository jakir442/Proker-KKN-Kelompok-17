import { cn } from "@/lib/utils";

interface NewsContentProps {
    content: string;
    className?: string;
}

export function NewsContent({ content, className }: NewsContentProps) {
    return (
        <article className={cn("mx-auto w-full max-w-4xl", className)}>
            <div
                className={cn(
                    "prose prose-neutral max-w-none",
                    "prose-headings:scroll-mt-24",
                    "prose-headings:font-bold",
                    "prose-headings:tracking-tight",
                    "prose-h2:mt-12 prose-h2:border-b prose-h2:pb-3",
                    "prose-h3:mt-10",
                    "prose-p:text-foreground/90",
                    "prose-p:leading-8",
                    "prose-p:text-[17px]",
                    "prose-a:text-primary",
                    "prose-a:no-underline",
                    "hover:prose-a:underline",
                    "prose-strong:text-foreground",
                    "prose-img:rounded-2xl",
                    "prose-img:shadow-xl",
                    "prose-blockquote:border-primary",
                    "prose-blockquote:bg-muted/40",
                    "prose-blockquote:py-2",
                    "prose-blockquote:px-6",
                    "prose-blockquote:rounded-r-xl",
                    "prose-ul:space-y-2",
                    "prose-ol:space-y-2",
                    "prose-li:marker:text-primary",
                    "prose-table:block",
                    "prose-table:w-full",
                    "prose-table:overflow-x-auto",
                    "prose-table:rounded-xl",
                    "prose-table:border",
                    "prose-th:bg-muted",
                    "prose-th:font-semibold",
                    "prose-td:border",
                    "prose-code:rounded",
                    "prose-code:bg-muted",
                    "prose-code:px-1.5",
                    "prose-code:py-0.5",
                    "prose-code:text-primary",
                    "prose-pre:rounded-2xl",
                    "prose-pre:border",
                    "prose-pre:bg-slate-950",
                    "dark:prose-invert",
                )}
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </article>
    );
}
