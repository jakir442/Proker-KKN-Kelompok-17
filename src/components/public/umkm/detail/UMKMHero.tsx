import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Clock3, MapPin, Store } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { Breadcrumb } from "@/components/public/layout/Breadcrumb";
import { Container } from "@/components/public/layout/Container";
import { Button } from "@/components/ui/button";

import { isUMKMOpen } from "@/lib/umkm";
import { IUMKM } from "@/types/umkm";

interface Props {
    item: IUMKM;
}

export function UMKMHero({ item }: Props) {
    const isOpen = isUMKMOpen(item.openTime, item.closeTime);

    return (
        <section className="relative overflow-hidden">
            {/* Cover */}
            <div className="relative h-[340px] sm:h-[420px] lg:h-[520px]">
                {item.logo ? (
                    <Image src={item.logo} alt={item.name} fill priority className="object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-slate-200" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
            </div>

            <Container className="relative -mt-16 pb-14">
                <Breadcrumb
                    items={[
                        {
                            label: "UMKM",
                            href: "/umkm",
                        },
                        {
                            label: item.name,
                        },
                    ]}
                />

                <div className="relative rounded-[32px] border border-white/20 bg-white/95 p-6 shadow-2xl backdrop-blur-xl lg:p-10">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                        {/* Logo */}
                        <div className="relative h-28 w-28 overflow-hidden rounded-3xl border bg-white shadow-lg">
                            {item.logo ? (
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <Store className="h-10 w-10 text-slate-400" />
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
                                    {item.category}
                                </span>

                                {item.featured && (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">
                                        <BadgeCheck className="h-4 w-4" />
                                        UMKM Unggulan
                                    </span>
                                )}

                                <span
                                    className={`rounded-full px-4 py-1 text-sm font-semibold ${
                                        isOpen
                                            ? "bg-emerald-600 text-white"
                                            : "bg-red-600 text-white"
                                    }`}
                                >
                                    {isOpen ? "Sedang Buka" : "Tutup"}
                                </span>
                            </div>

                            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                                {item.name}
                            </h1>

                            <p className="mt-3 text-lg text-slate-600">
                                Dikelola oleh{" "}
                                <span className="font-semibold text-slate-900">{item.owner}</span>
                            </p>

                            <div className="mt-8 flex flex-col gap-4 text-slate-600 sm:flex-row sm:flex-wrap">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-emerald-600" />
                                    <span>{item.address}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock3 className="h-5 w-5 text-emerald-600" />
                                    <span>
                                        {item.openTime} - {item.closeTime}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="h-12 flex-1 rounded-2xl bg-emerald-600 text-base font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
                                >
                                    <a
                                        href={`https://wa.me/${item.whatsapp.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2"
                                    >
                                        <FaWhatsapp className="mr-2 h-5 w-5" />
                                        Hubungi via WhatsApp
                                    </a>
                                </Button>

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className=" h-12 rounded-2xl border-slate-200 bg-white px-6 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50"
                                >
                                    <Link
                                        href="/umkm"
                                        className="inline-flex items-center justify-center gap-2"
                                    >
                                        <ArrowLeft className="mr-2 h-5 w-5" />
                                        Semua UMKM
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
