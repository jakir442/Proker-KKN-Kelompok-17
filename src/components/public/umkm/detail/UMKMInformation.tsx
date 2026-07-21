import { Clock3, MapPin, Navigation, Store, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";

import { Container } from "@/components/public/layout/Container";
import { IUMKM } from "@/types/umkm";

interface Props {
    item: IUMKM;
}

type Card = {
    icon: LucideIcon | IconType;
    title: string;
    value: string;
    href?: string;
};

export function UMKMInformation({ item }: Props) {
    const cards: Card[] = [
        {
            icon: Store,
            title: "Kategori",
            value: item.category,
        },
        {
            icon: User,
            title: "Pemilik",
            value: item.owner,
        },
        {
            icon: Clock3,
            title: "Jam Operasional",
            value: `${item.openTime} - ${item.closeTime}`,
        },
        {
            icon: FaWhatsapp,
            title: "WhatsApp",
            value: item.whatsapp,
            href: `https://wa.me/${item.whatsapp.replace(/\D/g, "")}`,
        },
        {
            icon: MapPin,
            title: "Alamat",
            value: item.address,
        },
        {
            icon: Navigation,
            title: "Koordinat",
            value:
                item.latitude && item.longitude
                    ? `${item.latitude}, ${item.longitude}`
                    : "Belum tersedia",
        },
    ];

    return (
        <section className="py-16">
            <Container>
                <div className="mb-10">
                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Informasi
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                        Informasi UMKM
                    </h2>

                    <p className="mt-3 max-w-2xl text-slate-600">
                        Informasi lengkap mengenai usaha, lokasi, jam operasional, dan kontak UMKM.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        const content = (
                            <>
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                                        card.title === "WhatsApp"
                                            ? "bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white"
                                            : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                                    }`}
                                >
                                    <Icon className="h-7 w-7" />
                                </div>

                                <div className="mt-5">
                                    <p className="text-sm font-medium text-slate-500">
                                        {card.title}
                                    </p>

                                    <p className="mt-2 break-words text-base font-semibold leading-7 text-slate-900">
                                        {card.value}
                                    </p>
                                </div>
                            </>
                        );

                        return (
                            <article
                                key={card.title}
                                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                            >
                                {card.href ? (
                                    <a
                                        href={card.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Hubungi melalui WhatsApp"
                                        className="block h-full rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    content
                                )}
                            </article>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
