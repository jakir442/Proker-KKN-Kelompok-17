import { Container } from "@/components/public/layout/Container";

export default function Loading() {
    return (
        <Container className="py-20">
            <div className="space-y-10">
                {/* Cover */}
                <div className="aspect-[16/8] w-full animate-pulse rounded-2xl bg-muted" />

                {/* Judul */}
                <div className="space-y-4">
                    <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
                </div>

                {/* Informasi Agenda */}
                <div className="space-y-4 rounded-xl border p-6">
                    <div className="h-5 w-56 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-48 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-64 animate-pulse rounded bg-muted" />
                </div>

                {/* Deskripsi */}
                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className={`h-4 animate-pulse rounded bg-muted ${
                                index === 7 ? "w-2/3" : "w-full"
                            }`}
                        />
                    ))}
                </div>

                {/* Related Events */}
                <div className="space-y-8">
                    <div className="h-8 w-64 animate-pulse rounded bg-muted" />

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="overflow-hidden rounded-xl border">
                                <div className="aspect-[16/9] animate-pulse bg-muted" />

                                <div className="space-y-4 p-5">
                                    <div className="h-6 animate-pulse rounded bg-muted" />

                                    <div className="space-y-2">
                                        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="h-4 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
}
