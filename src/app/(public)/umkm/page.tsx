import { Store, Sparkles, MapPinned } from "lucide-react";
import { Breadcrumb } from "@/components/public/layout/Breadcrumb";
import { Container } from "@/components/public/layout/Container";
import { SectionHeader } from "@/components/public/common/SectionHeader";
import { UMKMCard } from "@/components/public/umkm/UMKMCard";
import { UMKMToolbar } from "@/components/public/umkm/filters/UMKMToolbar";
import { getAllUMKMAction } from "@/actions/umkm/get-all-umkm";
import { getUMKMCategoriesAction } from "@/actions/umkm/get-umkm-categories";
import { UMKMPagination } from "@/components/public/umkm/filters/UMKMPagination";

interface Props {
    searchParams: Promise<{
        search?: string;
        category?: string;
        sort?: "newest" | "oldest" | "name" | "rating";
        page?: string;
    }>;
}

export default async function UMKMPage({ searchParams }: Props) {
    const params = await searchParams;
    const result = await getAllUMKMAction({
        search: params.search,
        category: params.category,
        sort: params.sort,
        page: Number(params.page ?? 1),
        limit: 5,
    });
    const categoryResult = await getUMKMCategoriesAction();
    const umkm = result.success ? result.data.items : [];
    const categories = categoryResult.success ? categoryResult.data : [];

    return (
        <main className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Hero */}
            <section className="relative overflow-hidden border-b">
                <div className="absolute inset-0">
                    <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
                    <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
                </div>

                <Container className="relative py-14 lg:py-20">
                    <Breadcrumb
                        items={[
                            {
                                label: "UMKM",
                            },
                        ]}
                    />

                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                            <Sparkles className="h-4 w-4" />
                            Produk Lokal Desa
                        </span>

                        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
                            UMKM Desa Cintanagara
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            Temukan berbagai produk unggulan hasil karya masyarakat Desa
                            Cintanagara. Dukung ekonomi lokal dengan membeli produk berkualitas
                            langsung dari pelaku UMKM.
                        </p>

                        <div className="mt-12 grid gap-5 sm:grid-cols-2">
                            <div className="rounded-3xl border bg-white p-8 shadow-sm">
                                <Store className="mx-auto h-10 w-10 text-emerald-600" />
                                <h2 className="mt-5 text-4xl font-bold text-slate-900">
                                    {result.success ? result.data.total : 0}
                                </h2>
                                <p className="mt-2 text-sm text-slate-500">Total UMKM Aktif</p>
                            </div>

                            <div className="rounded-3xl border bg-white p-8 shadow-sm">
                                <MapPinned className="mx-auto h-10 w-10 text-sky-600" />
                                <h2 className="mt-5 text-4xl font-bold text-slate-900">Desa</h2>
                                <p className="mt-2 text-sm text-slate-500">
                                    Berbasis Lokal Cintanagara
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* List */}
            <section className="py-16 lg:py-24">
                <Container>
                    <SectionHeader
                        badge="Direktori UMKM"
                        title="Jelajahi UMKM"
                        description="Berbagai usaha mikro, kecil, dan menengah yang aktif melayani masyarakat Desa Cintanagara."
                    />
                    <UMKMToolbar categories={categories} />
                    {umkm.length === 0 ? (
                        <div className="rounded-3xl border border-dashed bg-white py-20 text-center">
                            <Store className="mx-auto h-12 w-12 text-slate-300" />
                            <h3 className="mt-6 text-2xl font-bold text-slate-900">
                                Belum Ada UMKM
                            </h3>
                            <p className="mt-3 text-slate-500">
                                Saat ini belum terdapat UMKM yang dipublikasikan.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {umkm.map((item) => (
                                <UMKMCard key={item._id.toString()} item={item} />
                            ))}
                        </div>
                    )}
                    <UMKMPagination page={result.data.page} totalPages={result.data.totalPages} />
                </Container>
            </section>

            {/* CTA */}
            <section className="pb-24">
                <Container>
                    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 p-10 text-center text-white shadow-xl">
                        <h2 className="text-3xl font-bold">Dukung Produk Lokal Desa</h2>

                        <p className="mx-auto mt-4 max-w-2xl text-emerald-50">
                            Setiap pembelian Anda membantu pertumbuhan UMKM dan meningkatkan
                            perekonomian masyarakat Desa Cintanagara.
                        </p>
                    </div>
                </Container>
            </section>
        </main>
    );
}
