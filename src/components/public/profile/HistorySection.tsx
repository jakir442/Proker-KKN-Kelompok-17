interface Props {
    history: string;
}

export function HistorySection({ history }: Props) {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Sejarah Desa</h2>

                <p className="mt-2 text-muted-foreground">
                    Perjalanan terbentuknya Desa Cintanagara.
                </p>
            </div>

            <div className="rounded-2xl border bg-card p-8">
                <p className="leading-8 whitespace-pre-line">{history}</p>
            </div>
        </section>
    );
}
