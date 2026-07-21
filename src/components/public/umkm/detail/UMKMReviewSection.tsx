import { Star } from "lucide-react";
import { FadeUp, Stagger } from "@/components/animations";
import { Container } from "@/components/public/layout/Container";
import { UMKMReviewForm } from "./UMKMReviewForm";
import { UMKMReviewList } from "./UMKMReviewList";

import type { IUMKMReview } from "@/types/umkm-review";

interface Props {
    umkmId: string;
    reviews: IUMKMReview[];
}

export function UMKMReviewSection({ umkmId, reviews }: Props) {
    const totalReview = reviews.length;
    const averageRating =
        totalReview > 0
            ? (
                  reviews.reduce((total, item) => total + Number(item.rating), 0) / totalReview
              ).toFixed(1)
            : "0.0";

    return (
        <section className="bg-slate-50 py-20">
            <Container>
                <FadeUp>
                    <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                                ⭐ Review Warga
                            </span>

                            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                                Cerita & Pengalaman
                                <br />
                                dari Warga Cintanagara
                            </h2>

                            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 md:text-lg ">
                                Lihat bagaimana pengalaman warga setelah mencoba produk dan layanan
                                UMKM lokal. Setiap ulasan membantu meningkatkan kepercayaan dan
                                mendukung perkembangan usaha masyarakat desa.
                            </p>
                        </div>

                        {/* Rating Summary */}
                        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-extrabold text-slate-900">
                                    {averageRating}
                                </span>

                                <div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className="h-5 w-5 fill-amber-400 text-amber-400"
                                            />
                                        ))}
                                    </div>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {totalReview} Review
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeUp>

                <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
                    {/* List */}
                    <FadeUp delay={0.1}>
                        <Stagger>
                            <UMKMReviewList reviews={reviews} />
                        </Stagger>
                    </FadeUp>

                    {/* Form */}
                    <FadeUp delay={0.2}>
                        <div className="sticky top-24 h-fit">
                            <UMKMReviewForm umkmId={umkmId} />
                        </div>
                    </FadeUp>
                </div>
            </Container>
        </section>
    );
}
