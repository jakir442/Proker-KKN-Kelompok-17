import { Container } from "@/components/public/layout/Container";

export default function Loading() {
    return (
        <Container className="py-20">
            <div className="space-y-8">
                <div className="h-12 w-64 animate-pulse rounded bg-muted" />

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="space-y-4 rounded-xl border p-4">
                            <div className="aspect-video animate-pulse rounded bg-muted" />

                            <div className="h-6 animate-pulse rounded bg-muted" />

                            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />

                            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}
