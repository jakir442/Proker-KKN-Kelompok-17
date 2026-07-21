import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                <li>
                    <Link
                        href="/"
                        className="flex items-center gap-2 transition hover:text-emerald-600"
                    >
                        <Home className="h-4 w-4" />
                        Beranda
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={item.label} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-slate-400" />

                        {item.href ? (
                            <Link href={item.href} className="transition hover:text-emerald-600">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-medium text-slate-900">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
