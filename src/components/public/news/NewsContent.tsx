import { cn } from "@/lib/utils";

interface NewsContentProps {
    content: string;
    className?: string;
}

export function NewsContent({ content, className }: NewsContentProps) {
    return (
        <article
            className={cn("mx-auto w-full max-w-4xl", className)}
            style={{
                textAlign: "justify",
                fontSize: 18,
                lineHeight: 2,
            }}
        >
            <div
                className={cn(
                    // Base
                    "prose prose-neutral dark:prose-invert",
                    "max-w-none",

                    // ========================================
                    // Typography
                    // ========================================
                    "[&_p]:my-6",
                    "[&_p]:text-[18px]",
                    "[&_p]:leading-9",
                    "[&_p]:tracking-[0.01em]",
                    "[&_p]:text-justify",
                    "[&_p]:text-muted-foreground",

                    // ========================================
                    // Headings
                    // ========================================
                    "prose-headings:scroll-mt-24",
                    "prose-headings:font-bold",
                    "prose-headings:tracking-tight",
                    "prose-headings:text-foreground",

                    "prose-h2:mt-16",
                    "prose-h2:mb-6",
                    "prose-h2:text-3xl",

                    "prose-h3:mt-12",
                    "prose-h3:mb-4",
                    "prose-h3:text-2xl",

                    "prose-h4:mt-10",
                    "prose-h4:mb-3",
                    "prose-h4:text-xl",

                    // ========================================
                    // Links
                    // ========================================
                    "prose-a:font-medium",
                    "prose-a:text-primary",
                    "prose-a:no-underline",
                    "prose-a:underline-offset-4",
                    "hover:prose-a:underline",

                    // ========================================
                    // Images
                    // ========================================
                    "prose-img:my-10",
                    "prose-img:w-full",
                    "prose-img:rounded-2xl",
                    "prose-img:border",
                    "prose-img:shadow-lg",

                    // ========================================
                    // Lists
                    // ========================================
                    "prose-ul:my-8",
                    "prose-ol:my-8",
                    "[&_li]:my-2",
                    "[&_li]:leading-8",
                    "[&_li]:text-justify",
                    "prose-li:marker:text-primary",

                    // ========================================
                    // Blockquote
                    // ========================================
                    "prose-blockquote:my-8",
                    "prose-blockquote:rounded-xl",
                    "prose-blockquote:border-l-4",
                    "prose-blockquote:border-primary",
                    "prose-blockquote:bg-muted/30",
                    "prose-blockquote:px-8",
                    "prose-blockquote:py-5",
                    "[&_blockquote]:text-justify",
                    "[&_blockquote]:italic",

                    // ========================================
                    // Tables
                    // ========================================
                    "prose-table:my-8",
                    "prose-table:w-full",
                    "prose-table:border-collapse",

                    "prose-th:border",
                    "prose-th:bg-muted",
                    "prose-th:p-3",
                    "prose-th:text-left",

                    "prose-td:border",
                    "prose-td:p-3",

                    // ========================================
                    // Code
                    // ========================================
                    "prose-code:rounded-md",
                    "prose-code:bg-muted",
                    "prose-code:px-1.5",
                    "prose-code:py-1",
                    "prose-code:text-primary",
                    "prose-code:before:hidden",
                    "prose-code:after:hidden",

                    "prose-pre:rounded-2xl",
                    "prose-pre:border",
                    "prose-pre:shadow-lg",

                    // ========================================
                    // Horizontal Rule
                    // ========================================
                    "prose-hr:my-14",

                    // ========================================
                    // Selection
                    // ========================================
                    "selection:bg-primary/20",
                    "selection:text-foreground",
                )}
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </article>
    );
}
