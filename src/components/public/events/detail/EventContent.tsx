interface EventContentProps {
    description: string;
}

export function EventContent({ description }: EventContentProps) {
    return (
        <section className="rounded-3xl border bg-background p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Tentang Kegiatan
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Informasi lengkap mengenai agenda Desa Cintanagara.
                    </p>
                </div>

                <article
                    className="
                        prose
                        prose-neutral
                        max-w-none

                        dark:prose-invert

                        prose-headings:
                        scroll-mt-24

                        prose-p:
                        leading-8

                        prose-p:text-muted-foreground

                        prose-strong:text-foreground

                        prose-li:text-muted-foreground
                    "
                >
                    {description}
                </article>
            </div>
        </section>
    );
}
