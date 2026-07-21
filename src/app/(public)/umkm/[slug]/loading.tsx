import { Container } from "@/components/public/layout/Container";

export default function Loading() {
    return (
        <main className="animate-pulse bg-slate-50">
            <div className="h-[420px] bg-slate-200" />

            <Container className="space-y-8 py-10">
                <div className="h-10 w-72 rounded bg-slate-200" />

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="h-60 rounded-3xl bg-slate-200" />
                    <div className="h-60 rounded-3xl bg-slate-200" />
                </div>

                <div className="h-72 rounded-3xl bg-slate-200" />

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({
                        length: 3,
                    }).map((_, index) => (
                        <div key={index} className="h-[420px] rounded-3xl bg-slate-200" />
                    ))}
                </div>
            </Container>
        </main>
    );
}
