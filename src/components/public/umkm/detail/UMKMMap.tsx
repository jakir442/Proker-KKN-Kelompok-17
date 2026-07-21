import { ExternalLink, MapPin } from "lucide-react";

import { Container } from "@/components/public/layout/Container";
import { Button } from "@/components/ui/button";
import { IUMKM } from "@/types/umkm";

interface Props {
    item: IUMKM;
}

export function UMKMMap({ item }: Props) {
    if (!item.latitude || !item.longitude) {
        return (
            <section className="py-16">
                <Container>
                    <div className="mb-10">
                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Lokasi
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                            Lokasi UMKM
                        </h2>

                        <p className="mt-3 text-slate-600">Lokasi UMKM belum tersedia.</p>
                    </div>

                    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-300 bg-slate-50 px-8 text-center">
                        <MapPin className="h-14 w-14 text-slate-300" />

                        <h3 className="mt-6 text-xl font-semibold text-slate-900">
                            Lokasi Belum Ditambahkan
                        </h3>

                        <p className="mt-3 max-w-md text-slate-500">
                            Koordinat Google Maps belum tersedia untuk UMKM ini.
                        </p>
                    </div>
                </Container>
            </section>
        );
    }

    const embedUrl = `https://www.google.com/maps?q=${item.latitude},${item.longitude}&z=16&output=embed`;

    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`;

    return (
        <section className="py-16">
            <Container>
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Lokasi
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                            Temukan Lokasi UMKM
                        </h2>

                        <p className="mt-3 max-w-2xl text-slate-600">
                            Datang langsung ke lokasi UMKM atau buka navigasi menggunakan Google
                            Maps.
                        </p>
                    </div>

                    <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700">
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Buka Google Maps
                        </a>
                    </Button>
                </div>

                <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
                    <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
                        <div className="flex items-start gap-3">
                            <div className="rounded-2xl bg-emerald-100 p-3">
                                <MapPin className="h-5 w-5 text-emerald-600" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900">{item.name}</h3>

                                <p className="mt-1 text-sm leading-6 text-slate-600">
                                    {item.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    <iframe
                        src={embedUrl}
                        title={item.name}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-[500px] w-full border-0"
                    />
                </div>
            </Container>
        </section>
    );
}
