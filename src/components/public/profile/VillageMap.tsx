interface Props {
    latitude: number;
    longitude: number;
}

export function VillageMap({ latitude, longitude }: Props) {
    const src = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

    return (
        <section className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold">Lokasi Desa</h2>

                <p className="mt-2 text-muted-foreground">Lokasi administratif Desa Cintanagara.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border">
                <iframe
                    title="Lokasi Desa Cintanagara"
                    src={src}
                    width="100%"
                    height="450"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0"
                />
            </div>
        </section>
    );
}
