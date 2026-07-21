import { Container } from "@/components/public/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden">
                <Skeleton className="h-[420px] w-full sm:h-[520px] lg:h-[640px]" />

                <Container className="absolute inset-x-0 bottom-0 pb-12 sm:pb-16 lg:pb-20">
                    <div className="max-w-5xl">
                        {/* Breadcrumb */}
                        <Skeleton className="mb-8 h-4 w-72" />

                        {/* Badge */}
                        <Skeleton className="mb-6 h-9 w-36 rounded-full" />

                        {/* Title */}
                        <Skeleton className="h-12 w-full max-w-4xl rounded-xl" />
                        <Skeleton className="mt-4 h-12 w-4/5 rounded-xl" />

                        {/* Excerpt */}
                        <Skeleton className="mt-8 h-5 w-full max-w-3xl" />
                        <Skeleton className="mt-3 h-5 w-5/6" />

                        {/* Metadata */}
                        <div className="mt-10 flex gap-4">
                            <Skeleton className="h-12 w-48 rounded-2xl" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* Content */}
            <Container className="py-16">
                <div className="mx-auto max-w-4xl space-y-5">
                    {Array.from({ length: 14 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className={`h-5 ${
                                index % 4 === 0
                                    ? "w-full"
                                    : index % 4 === 1
                                      ? "w-[96%]"
                                      : index % 4 === 2
                                        ? "w-[92%]"
                                        : "w-[84%]"
                            }`}
                        />
                    ))}
                </div>

                {/* Share */}
                <div className="mx-auto mt-14 max-w-4xl rounded-3xl border p-6">
                    <Skeleton className="h-7 w-52" />

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Skeleton className="h-11 w-36 rounded-xl" />
                        <Skeleton className="h-11 w-36 rounded-xl" />
                        <Skeleton className="h-11 w-36 rounded-xl" />
                        <Skeleton className="h-11 w-36 rounded-xl" />
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-40 rounded-3xl" />
                    <Skeleton className="h-40 rounded-3xl" />
                </div>
            </Container>

            {/* Related News */}
            <section className="border-t bg-muted/20 py-20">
                <Container>
                    <Skeleton className="h-6 w-40 rounded-full" />

                    <Skeleton className="mt-6 h-10 w-72" />

                    <Skeleton className="mt-4 h-5 w-full max-w-xl" />

                    <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="overflow-hidden rounded-3xl border">
                                <Skeleton className="h-64 w-full" />

                                <div className="space-y-4 p-6">
                                    <Skeleton className="h-4 w-28" />

                                    <Skeleton className="h-7 w-full" />

                                    <Skeleton className="h-7 w-3/4" />

                                    <Skeleton className="h-4 w-full" />

                                    <Skeleton className="h-4 w-[90%]" />

                                    <Skeleton className="h-10 w-40 rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>
        </>
    );
}
