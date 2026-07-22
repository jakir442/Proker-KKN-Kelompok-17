"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { IUMKMReview } from "@/types/umkm-review";

interface Props {
    reviews: IUMKMReview[];
}

const PER_PAGE = 5;

function getInitial(name: string) {
    return name.charAt(0).toUpperCase();
}

function formatDate(date: Date | string) {
    return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

export function UMKMReviewList({ reviews }: Props) {
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(reviews.length / PER_PAGE);

    const currentReviews = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return reviews.slice(start, start + PER_PAGE);
    }, [page, reviews]);

    function handlePageChange(nextPage: number) {
        setPage(nextPage);
        window.scrollTo({
            top: document.body.scrollHeight - 700,
            behavior: "smooth",
        });
    }

    if (reviews.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <UserRound className="mx-auto h-10 w-10 text-slate-300" />

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                    Belum Ada Review
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    Jadilah orang pertama yang memberikan penilaian untuk UMKM ini.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {currentReviews.map((review) => (
                <article
                    key={review._id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                            {getInitial(review.name)}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <h4 className="font-semibold text-slate-900">
                                    {review.name}
                                </h4>

                                <span className="text-xs text-slate-500">
                                    {formatDate(review.createdAt)}
                                </span>
                            </div>

                            <div className="mt-2 flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                            star <= review.rating
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-slate-200"
                                        }`}
                                    />
                                ))}
                            </div>

                            <p className="mt-4 leading-7 text-slate-600">
                                {review.comment}
                            </p>
                        </div>
                    </div>
                </article>
            ))}

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }).map((_, index) => {
                        const number = index + 1;

                        return (
                            <Button
                                key={number}
                                variant={page === number ? "default" : "outline"}
                                className="h-10 w-10 rounded-xl"
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </Button>
                        );
                    })}

                    <Button
                        variant="outline"
                        size="icon"
                        disabled={page === totalPages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}