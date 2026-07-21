import Image from "next/image";
import { Camera, ImageIcon } from "lucide-react";

import { Container } from "@/components/public/layout/Container";

interface Props {
    images: string[];
}

export function UMKMGallery({ images }: Props) {
    if (!images || images.length === 0) {
        return (
            <section className="py-16">
                <Container>
                    <div className="mb-10">
                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Galeri
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                            Galeri UMKM
                        </h2>

                        <p className="mt-3 text-slate-600">Dokumentasi kegiatan dan produk UMKM.</p>
                    </div>

                    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[32px] border border-dashed border-slate-300 bg-slate-50 text-center">
                        <ImageIcon className="h-14 w-14 text-slate-300" />

                        <h3 className="mt-6 text-xl font-semibold text-slate-900">
                            Belum Ada Galeri
                        </h3>

                        <p className="mt-3 max-w-md text-slate-500">
                            Foto produk maupun dokumentasi UMKM belum tersedia.
                        </p>
                    </div>
                </Container>
            </section>
        );
    }

    return (
        <section className="py-16">
            <Container>
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Galeri
                        </span>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                            Foto UMKM
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Lihat berbagai produk dan aktivitas UMKM.
                        </p>
                    </div>

                    <div className="hidden items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm md:flex">
                        <Camera className="h-4 w-4 text-emerald-600" />
                        {images.length} Foto
                    </div>
                </div>

                <div className="grid auto-rows-[220px] gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {images.map((image, index) => (
                        <div
                            key={`${image}-${index}`}
                            className={`group relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                                index === 0
                                    ? "sm:col-span-2 sm:row-span-2 sm:auto-rows-[450px]"
                                    : ""
                            }`}
                        >
                            <Image
                                src={image}
                                alt={`Galeri ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width:768px)100vw,(max-width:1280px)50vw,33vw"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="absolute bottom-5 left-5 translate-y-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur">
                                    Foto {index + 1}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
