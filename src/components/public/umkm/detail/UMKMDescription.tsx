import { FileText } from "lucide-react";

import { Container } from "@/components/public/layout/Container";
import { IUMKM } from "@/types/umkm";

interface Props {
    item: IUMKM;
}

export function UMKMDescription({ item }: Props) {
    return (
        <section className="py-16">
            <Container>
                <div className="mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            <FileText className="h-4 w-4" />
                            Tentang UMKM
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                            Mengenal Lebih Dekat
                        </h2>

                        <p className="mt-3 text-lg leading-8 text-slate-600">
                            Informasi mengenai profil, produk, dan kegiatan usaha yang dijalankan
                            oleh UMKM.
                        </p>
                    </div>

                    {/* Content */}
                    <article className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-12">
                        <div className="prose prose-slate max-w-none">
                            <p className="whitespace-pre-line text-lg leading-9 text-slate-700">
                                {item.description}
                            </p>
                        </div>
                    </article>
                </div>
            </Container>
        </section>
    );
}
