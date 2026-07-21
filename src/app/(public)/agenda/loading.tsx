import { Container } from "@/components/public/layout/Container";

function Skeleton({ className }: { className: string }) {
    return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />;
}

export default function Loading() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/30 via-background to-background py-24 lg:py-32">
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-0 top-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
            </div>

            <Container>
                <div className="space-y-5 text-center">
                    <Skeleton className="mx-auto h-8 w-32 rounded-full" />

                    <Skeleton className="mx-auto h-12 w-96 max-w-full" />

                    <Skeleton className="mx-auto h-5 w-[32rem] max-w-full" />
                </div>

                <div className="mt-16 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                    {/* Featured Event */}
                    <div className="overflow-hidden rounded-3xl border bg-background">
                        <Skeleton className="aspect-[16/10] w-full rounded-none" />

                        <div className="space-y-6 p-8">
                            <div className="flex gap-5">
                                <Skeleton className="h-20 w-20 rounded-3xl" />

                                <div className="flex-1 space-y-3">
                                    <Skeleton className="h-8 w-3/4" />

                                    <Skeleton className="h-5 w-full" />

                                    <Skeleton className="h-5 w-5/6" />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="rounded-2xl border p-4">
                                        <Skeleton className="mb-3 h-4 w-16" />

                                        <Skeleton className="h-5 w-full" />
                                    </div>
                                ))}
                            </div>

                            <Skeleton className="h-5 w-40" />
                        </div>
                    </div>

                    {/* Event List */}
                    <div className="grid gap-6">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-3xl border bg-background"
                            >
                                <Skeleton className="aspect-[16/10] w-full rounded-none" />

                                <div className="flex gap-4 p-6">
                                    <Skeleton className="h-16 w-16 rounded-2xl" />

                                    <div className="flex-1 space-y-3">
                                        <Skeleton className="h-6 w-3/4" />

                                        <Skeleton className="h-4 w-full" />

                                        <Skeleton className="h-4 w-5/6" />

                                        <Skeleton className="mt-6 h-5 w-28" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
