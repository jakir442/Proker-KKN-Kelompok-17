"use client";

import { useState } from "react";
import { Send, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createUMKMReviewAction } from "@/actions/public/create-umkm-review";

interface Props {
    umkmId: string;
}

export function UMKMReviewForm({ umkmId }: Props) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSuccess(false);
        setError("");

        if (!name.trim() || !comment.trim() || rating === 0) {
            setError("Lengkapi nama, rating, dan komentar terlebih dahulu.");
            return;
        }

        try {
            setLoading(true);

            const result = await createUMKMReviewAction({
                umkmId,
                name,
                rating,
                comment,
            });

            if (!result.success) {
                setError("Review gagal dikirim.");
                return;
            }

            setSuccess(true);
            setName("");
            setComment("");
            setRating(0);
        } catch {
            setError("Terjadi kesalahan saat mengirim review.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
            <div>
                <h3 className="text-xl font-bold text-slate-900">Berikan Penilaian</h3>
                <p className="mt-2 text-sm text-slate-600">
                    Bagikan pengalaman Anda mengenai UMKM ini.
                </p>
            </div>

            <div>
                <label className="text-sm font-semibold text-slate-700">Rating</label>

                <div className="mt-3 flex gap-2" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="rounded-full p-1 transition hover:scale-110 focus-visible:ring-4 focus-visible:ring-amber-300"
                            aria-label={`${star} bintang`}
                        >
                            <Star
                                className={`h-8 w-8 transition ${star <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-sm font-semibold text-slate-700">Nama</label>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Anda"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
            </div>

            <div>
                <label className="text-sm font-semibold text-slate-700">Komentar</label>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tuliskan pengalaman Anda..."
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
                <Send className="h-4 w-4" />
                {loading ? "Mengirim..." : "Kirim Review"}
            </Button>

            {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    Review berhasil dikirim. Terima kasih!
                </div>
            )}
        </form>
    );
}
