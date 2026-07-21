import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "../layout/Container";
import { SectionHeader } from "../common/SectionHeader";
import { UMKMCard } from "./UMKMCard";

import { getFeaturedUMKMAction } from "@/actions/public/get-featured-umkm";

export async function FeaturedUMKM() {
    const result = await getFeaturedUMKMAction();

    const umkm = result.success ? result.data : [];

    if (umkm.length === 0) {
        return null;
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 md:py-20 xl:py-28">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
                <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
            </div>

            <Container className="relative">
                <SectionHeader
                    badge="UMKM Desa"
                    title="UMKM Unggulan"
                    description="Temukan berbagai produk unggulan hasil karya masyarakat Desa Cintanagara yang memiliki kualitas terbaik."
                />

                <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {umkm.map((item) => (
                        <UMKMCard key={item._id.toString()} item={item} />
                    ))}
                </div>

                <div className="mt-14 flex justify-center">
                    <Link
                        href="/umkm"
                        className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white hover:shadow-lg"
                    >
                        Jelajahi Semua UMKM
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
