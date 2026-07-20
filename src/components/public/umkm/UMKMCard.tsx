import Image from "next/image";
import Link from "next/link";
import { MapPin, Tag, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IUMKM } from "@/types/umkm";

interface UMKMCardProps {
    item: IUMKM;
}

export function UMKMCard({ item }: UMKMCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-2 hover:shadow-xl">
            <div className="relative h-60 overflow-hidden">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 bg-slate-200" />
                )}

                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                    UMKM
                </span>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold">{item.name}</h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <Tag className="h-4 w-4 text-emerald-600" />
                    {item.category}
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    {item.address}
                </div>

                <Button variant="link" className="mt-5 p-0 text-emerald-600">
                    <Link href={`/umkm/${item.slug}`}>
                        Lihat Detail
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </article>
    );
}
