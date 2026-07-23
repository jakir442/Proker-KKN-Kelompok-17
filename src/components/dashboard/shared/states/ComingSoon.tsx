import Link from "next/link";
import { ArrowLeft, Clock3, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ComingSoonProps {
    title: string;
    description: string;
    backHref?: string;
}

export function ComingSoon({ title, description, backHref = "/dashboard" }: ComingSoonProps) {
    return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <div className="mx-auto max-w-xl text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                    <Clock3 className="h-10 w-10 text-primary" />
                </div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    Segera Hadir
                </div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <p className="mt-4 text-muted-foreground">{description}</p>
                <div className="mt-8 flex justify-center">
                    <Button>
                        <Link href={backHref} className="inline-flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Kembali ke Dashboard</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
