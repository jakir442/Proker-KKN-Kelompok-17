import { Container } from "@/components/public/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
                <Container>
                    <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24">
                        <Skeleton className="h-8 w-32 rounded-full" />

                        <Skeleton className="mt-6 h-12 w-80 rounded-xl sm:w-[32rem]" />

                        <Skeleton className="mt-3 h-12 w-64 rounded-xl sm:w-96" />

                        <Skeleton className="mt-6 h-5 w-full max-w-xl" />

                        <Skeleton className="mt-3 h-5 w-3/4 max-w-lg" />

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Skeleton className="h-20 w-48 rounded-2xl" />
                            <Skeleton className="h-20 w-48 rounded-2xl" />
                        </div>
                    </div>
                </Container>
            </section>

            <Container>
                <section className="py-12 sm:py-16">
                    {/* Search */}
                    <div className="mx-auto max-w-2xl">
                        <Skeleton className="h-14 w-full rounded-full" />
                    </div>

                    {/* Counter */}
                    <div className="mt-6 flex items-center justify-between">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-32" />
                    </div>

                    {/* Grid */}
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <article
                                key={index}
                                className="overflow-hidden rounded-3xl border"
                            >
                                <Skeleton className="aspect-[16/10] w-full" />

                                <div className="space-y-4 p-6">
                                    <Skeleton className="h-4 w-28" />

                                    <Skeleton className="h-7 w-full" />
                                    <Skeleton className="h-7 w-4/5" />

                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />

                                    <Skeleton className="mt-6 h-5 w-36" />
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-14 flex justify-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>
                </section>
            </Container>
        </>
    );
}