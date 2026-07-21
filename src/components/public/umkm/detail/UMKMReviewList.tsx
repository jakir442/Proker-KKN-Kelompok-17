import { Star, UserRound } from "lucide-react";

import type { IUMKMReview } from "@/types/umkm-review";

interface Props {
    reviews: IUMKMReview[];
}

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
    if (reviews.length === 0) {
        return (
            <div
                className="
                rounded-3xl
                border
                border-dashed
                border-slate-300
                bg-white
                p-8
                text-center
                "
            >
                <UserRound
                    className="
                    mx-auto
                    h-10
                    w-10
                    text-slate-300
                    "
                />

                <h3
                    className="
                    mt-4
                    font-bold
                    text-slate-900
                    "
                >
                    Belum Ada Review
                </h3>

                <p
                    className="
                    mt-2
                    text-sm
                    text-slate-500
                    "
                >
                    Jadilah orang pertama yang memberikan penilaian.
                </p>
            </div>
        );
    }

    return (
        <div
            className="
            space-y-5
            "
        >
            {reviews.map((review) => (
                <article
                    key={review._id}
                    className="
                        rounded-3xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-lg
                        "
                >
                    <div
                        className="
                            flex
                            items-start
                            gap-4
                            "
                    >
                        {/* Avatar */}

                        <div
                            className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-emerald-100
                                font-bold
                                text-emerald-700
                                "
                        >
                            {getInitial(review.name)}
                        </div>

                        <div
                            className="
                                flex-1
                                "
                        >
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-2
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    "
                            >
                                <h4
                                    className="
                                        font-semibold
                                        text-slate-900
                                        "
                                >
                                    {review.name}
                                </h4>

                                <span
                                    className="
                                        text-xs
                                        text-slate-500
                                        "
                                >
                                    {formatDate(review.createdAt)}
                                </span>
                            </div>

                            {/* Stars */}

                            <div
                                className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-1
                                    "
                            >
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`
                                                h-4
                                                w-4

                                                ${
                                                    star <= review.rating
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "text-slate-200"
                                                }
                                                `}
                                    />
                                ))}
                            </div>

                            {/* Comment */}

                            <p
                                className="
                                    mt-4
                                    text-sm
                                    leading-7
                                    text-slate-600
                                    "
                            >
                                {review.comment}
                            </p>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
