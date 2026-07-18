import Image from "next/image";

interface Props {
    name: string;
    photo?: string;
    greeting: string;
}

export function HeadmanSection({ name, photo, greeting }: Props) {
    return (
        <section className="rounded-2xl border bg-card p-8">
            <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:items-center">
                <div className="flex justify-center">
                    <div className="overflow-hidden rounded-2xl border shadow-sm">
                        <Image
                            src={photo || "/images/avatar-placeholder.png"}
                            alt={name}
                            width={260}
                            height={320}
                            className="h-[320px] w-[260px] object-cover"
                        />
                    </div>
                </div>

                <div>
                    <p className="text-sm font-medium text-primary">Sambutan Kepala Desa</p>

                    <h2 className="mt-2 text-3xl font-bold">{name}</h2>

                    <div className="mt-6 space-y-5 text-muted-foreground leading-8 whitespace-pre-line">
                        {greeting}
                    </div>
                </div>
            </div>
        </section>
    );
}
