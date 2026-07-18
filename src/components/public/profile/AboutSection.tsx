interface Props {
    about: string;
}

export function AboutSection({ about }: Props) {
    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Tentang Desa</h2>

                <p className="mt-2 text-muted-foreground">
                    Gambaran umum mengenai Desa Cintanagara.
                </p>
            </div>

            <div className="rounded-2xl border bg-card p-8">
                <p className="leading-8 whitespace-pre-line">{about}</p>
            </div>
        </section>
    );
}
