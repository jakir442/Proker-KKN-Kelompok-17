import { Container } from "@/components/public/layout/Container";

export default function Loading() {
    return (
        <Container className="py-16 lg:py-24">
            <div className="space-y-16">
                {/* Hero */}
                <section className="space-y-8">
                    <div className="aspect-[16/7] w-full animate-pulse overflow-hidden rounded-3xl bg-muted" />

                    <div className="space-y-5">
                        <div className="h-5 w-36 animate-pulse rounded-full bg-muted" />

                        <div className="h-12 w-full max-w-3xl animate-pulse rounded-xl bg-muted" />

                        <div className="h-5 w-full max-w-xl animate-pulse rounded-lg bg-muted" />
                    </div>
                </section>

                {/* Metadata */}
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 rounded-2xl border bg-background p-5"
                        >
                            <div className="h-12 w-12 animate-pulse rounded-2xl bg-muted" />

                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-20 animate-pulse rounded bg-muted" />

                                <div className="h-5 w-28 animate-pulse rounded bg-muted" />
                            </div>
                        </div>
                    ))}
                </section>

                {/* Content */}
                <section className="space-y-5">
                    <div className="h-8 w-56 animate-pulse rounded-lg bg-muted" />

                    {Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-4 animate-pulse rounded bg-muted ${
                                index === 8 ? "w-2/3" : index % 2 === 0 ? "w-full" : "w-[96%]"
                            }`}
                        />
                    ))}
                </section>

                {/* Gallery Placeholder */}
                <section className="space-y-6">
                    <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="aspect-[16/10] animate-pulse rounded-3xl bg-muted" />

                        <div className="grid gap-5 grid-cols-2">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="aspect-square animate-pulse rounded-2xl bg-muted"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Events */}
                <section className="space-y-8">
                    <div className="space-y-3">
                        <div className="h-8 w-72 animate-pulse rounded-lg bg-muted" />

                        <div className="h-5 w-80 animate-pulse rounded bg-muted" />
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-3xl border bg-background"
                            >
                                <div className="aspect-[16/10] animate-pulse bg-muted" />

                                <div className="space-y-5 p-6">
                                    <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />

                                    <div className="h-7 w-full animate-pulse rounded bg-muted" />

                                    <div className="space-y-3">
                                        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                                    </div>

                                    <div className="flex gap-2">
                                        <div className="h-8 w-24 animate-pulse rounded-full bg-muted" />
                                        <div className="h-8 w-20 animate-pulse rounded-full bg-muted" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Container>
    );
}
