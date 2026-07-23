import { Container } from "@/components/public/layout/Container";

export default function Loading() {
    return (
        <Container className="py-20">
            <div className="space-y-8 animate-pulse">
                <div className="h-[420px] rounded-3xl bg-muted" />

                <div className="h-12 w-2/3 rounded-xl bg-muted" />

                <div className="h-5 w-full rounded bg-muted" />

                <div className="h-5 w-5/6 rounded bg-muted" />

                <div className="grid gap-6 md:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-52 rounded-3xl bg-muted" />
                    ))}
                </div>
            </div>
        </Container>
    );
}
