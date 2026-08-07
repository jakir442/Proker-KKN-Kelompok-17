import Link from "next/link";

import { ChevronRight, House } from "lucide-react";

interface Props {
    title: string;
}

export function NewsBreadcrumb({ title }: Props) {
    return (
        <nav aria-label="Breadcrumb" className="border-b bg-muted/20">
            <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-sm text-muted-foreground">
                <Link
                    href="/"
                    className="flex items-center gap-2 transition-colors hover:text-primary"
                >
                    <House className="size-4" />
                    Beranda
                </Link>

                <ChevronRight className="size-4" />

                <Link href="/berita" className="transition-colors hover:text-primary">
                    Berita
                </Link>

                <ChevronRight className="size-4" />

                <span className="line-clamp-1 font-medium text-foreground">{title}</span>
            </div>
        </nav>
    );
}
