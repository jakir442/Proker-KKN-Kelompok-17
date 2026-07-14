import { notFound } from "next/navigation";

import { Clock3, BadgeCheck, FileText, ListChecks } from "lucide-react";

import { Container } from "@/components/public/layout/Container";

import { findServiceBySlug } from "@/repositories/service.repository";

import { Badge } from "@/components/ui/badge";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;

    const service = await findServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <Container className="py-16">
            <Badge className="mb-5">Layanan Desa</Badge>

            <h1 className="text-4xl font-bold">{service.title}</h1>

            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{service.description}</p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border p-6">
                    <div className="mb-5 flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-primary" />

                        <h2 className="font-semibold">Persyaratan</h2>
                    </div>

                    <ul className="space-y-3">
                        {service.requirements.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <BadgeCheck className="mt-0.5 h-4 w-4 text-green-600" />

                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-2xl border p-6">
                    <div className="mb-5 flex items-center gap-2">
                        <ListChecks className="h-5 w-5 text-primary" />

                        <h2 className="font-semibold">Alur Pengajuan</h2>
                    </div>

                    <p className="whitespace-pre-line text-muted-foreground">{service.process}</p>
                </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border p-6">
                    <div className="flex items-center gap-2">
                        <Clock3 className="h-5 w-5 text-primary" />

                        <h3 className="font-semibold">Estimasi Waktu</h3>
                    </div>

                    <p className="mt-3 text-muted-foreground">{service.duration}</p>
                </div>

                <div className="rounded-2xl border p-6">
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />

                        <h3 className="font-semibold">Biaya</h3>
                    </div>

                    <p className="mt-3 text-muted-foreground">{service.fee}</p>
                </div>
            </div>
        </Container>
    );
}
