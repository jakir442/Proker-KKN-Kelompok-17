import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Clock3,
    MapPin,
    MessageCircle,
    Sparkles,
    Star,
    Store,
    Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { IUMKM } from "@/types/umkm";
import { isUMKMOpen } from "@/lib/umkm";
import { FaWhatsapp } from "react-icons/fa";
import { UMKMRating } from "./detail/UMKMRating";

interface UMKMCardProps {
    item: IUMKM;
}

export function UMKMCard({ item }: UMKMCardProps) {
    const isOpen = isUMKMOpen(item.openTime, item.closeTime);

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-100">
            {/* Cover */}
            <Link
                href={`/umkm/${item.slug}`}
                className="relative block h-64 overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            >
                {item.logo ? (
                    <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 animate-pulse bg-slate-200" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute left-4 top-4 flex flex-wrap gap-3">
                    <span className="flex flex-col items-center justify-center rounded-2xl bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                        <Store className="mb-1 h-4 w-4" />
                        UMKM
                    </span>

                    {item.featured && (
                        <span className="flex flex-col items-center justify-center rounded-2xl bg-amber-400 px-4 py-2 text-xs font-bold text-amber-950 shadow">
                            <Sparkles className="mb-1 h-4 w-4" />
                            Unggulan
                        </span>
                    )}

                    {item.rating >= 4.5 && (
                        <span className="flex flex-col items-center justify-center rounded-2xl bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
                            <Star className="mb-1 h-4 w-4 fill-emerald-600" />
                            Favorit
                        </span>
                    )}
                </div>

                <div className="absolute bottom-4 left-4">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
                            isOpen ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                        }`}
                    >
                        {isOpen ? "Sedang Buka" : "Tutup"}
                    </span>
                </div>
            </Link>

            <div className="flex flex-1 flex-col p-6">
                {/* Title */}
                <Link href={`/umkm/${item.slug}`}>
                    <h3 className="text-xl font-bold leading-tight text-slate-900 transition-colors hover:text-emerald-600">
                        {item.name}
                    </h3>
                </Link>

                <div className="mt-3">
                    <UMKMRating rating={item.rating} reviewCount={item.reviewCount} />
                </div>

                <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-emerald-600" />
                        <span>{item.category}</span>
                    </div>

                    <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="line-clamp-2">{item.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-emerald-600" />
                        <span>
                            {item.openTime} - {item.closeTime}
                        </span>
                    </div>
                </div>

                <div className="mt-auto flex gap-3 pt-6">
                    <Button className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700">
                        <Link
                            href={`/umkm/${item.slug}`}
                            className="inline-flex items-center justify-center gap-2"
                        >
                            Detail
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>

                    <Button variant="outline" className="rounded-xl">
                        <a
                            href={`https://wa.me/${item.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Hubungi ${item.name} melalui WhatsApp`}
                        >
                            <FaWhatsapp className="h-4 w-4 text-green-600" />
                        </a>
                    </Button>
                </div>
            </div>
        </article>
    );
}
