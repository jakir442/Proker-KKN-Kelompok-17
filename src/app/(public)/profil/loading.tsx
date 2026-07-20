import { Container } from "@/components/public/layout/Container";

export default function Loading() {
    return (
        <Container className="py-12">
            <div className="space-y-10 animate-pulse">
                {/* Hero */}
                <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-muted">
                    <div className="absolute left-10 top-10 h-8 w-36 rounded-full bg-background/60" />

                    <div className="absolute bottom-16 left-10 space-y-4">
                        <div className="h-12 w-80 rounded-lg bg-background/70" />
                        <div className="h-5 w-64 rounded bg-background/60" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <div className="h-8 w-48 rounded bg-muted" />

                    <div className="space-y-3">
                        <div className="h-4 w-full rounded bg-muted" />
                        <div className="h-4 w-11/12 rounded bg-muted" />
                        <div className="h-4 w-10/12 rounded bg-muted" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="h-36 rounded-2xl bg-muted" />
                        ))}
                    </div>

                    <div className="h-72 rounded-3xl bg-muted" />
                </div>
            </div>
        </Container>
    );
}
