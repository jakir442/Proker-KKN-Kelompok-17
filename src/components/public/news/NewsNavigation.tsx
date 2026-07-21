import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { cn } from "@/lib/utils";

interface NavigationNews {
    slug: string;
    title: string;
}

interface NewsNavigationProps {
    previous?: NavigationNews | null;
    next?: NavigationNews | null;
    className?: string;
}

function NavigationCard({
    href,
    label,
    title,
    direction,
}: {
    href: string;
    label: string;
    title: string;
    direction: "previous" | "next";
}) {
    const isPrevious = direction === "previous";

    return (
        <Link
            href={href}
            className={cn(
                "group relative flex min-h-[140px] flex-1 overflow-hidden rounded-3xl border bg-card p-6 shadow-sm transition-all duration-300",
                "hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl",
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.08] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div
                className={cn(
                    "relative flex w-full",
                    isPrevious
                        ? "items-start gap-5"
                        : "flex-row-reverse items-start gap-5 text-right",
                )}
            >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    {isPrevious ? (
                        <ArrowLeft className="h-5 w-5" />
                    ) : (
                        <ArrowRight className="h-5 w-5" />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>

                    <h3 className="mt-2 line-clamp-3 text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary">
                        {title}
                    </h3>
                </div>
            </div>
        </Link>
    );
}

export function NewsNavigation({ previous, next, className }: NewsNavigationProps) {
    if (!previous && !next) return null;

    return (
        <FadeIn>
            <section className={cn("py-16", className)}>
                <div className="grid gap-6 md:grid-cols-2">
                    {previous ? (
                        <NavigationCard
                            href={`/berita/${previous.slug}`}
                            direction="previous"
                            label="Berita Sebelumnya"
                            title={previous.title}
                        />
                    ) : (
                        <div />
                    )}

                    {next ? (
                        <NavigationCard
                            href={`/berita/${next.slug}`}
                            direction="next"
                            label="Berita Selanjutnya"
                            title={next.title}
                        />
                    ) : (
                        <div />
                    )}
                </div>
            </section>
        </FadeIn>
    );
}
