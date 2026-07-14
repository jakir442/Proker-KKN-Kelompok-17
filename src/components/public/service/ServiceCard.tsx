import Link from "next/link";

import { ArrowRight, Clock3, FileText } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
    slug: string;

    title: string;

    description: string;

    duration: string;

    fee: string;

    requirements: number;
}

export function ServiceCard({ slug, title, description, duration, fee, requirements }: Props) {
    return (
        <Card className="group rounded-2xl border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <CardContent className="space-y-5 p-6">
                <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-primary/10 p-3">
                        <FileText className="h-6 w-6 text-primary" />
                    </div>

                    <Badge>{requirements} Persyaratan</Badge>
                </div>

                <div>
                    <h3 className="text-xl font-semibold">{title}</h3>

                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{description}</p>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Estimasi</span>

                        <span className="font-medium flex items-center gap-1">
                            <Clock3 className="h-4 w-4" />

                            {duration}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Biaya</span>

                        <span className="font-medium">{fee}</span>
                    </div>
                </div>

                <Link
                    href={`/layanan/${slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                >
                    Lihat Detail
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </CardContent>
        </Card>
    );
}
