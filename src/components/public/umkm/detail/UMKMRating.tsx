import { Star } from "lucide-react";

interface Props {
    rating?: number;
    reviewCount?: number;
}

export function UMKMRating({ rating = 0, reviewCount = 0 }: Props) {
    if (!rating || rating === 0) {
        return (
            <div className="flex items-center gap-2 text-sm text-slate-500">
                <Star className="h-4 w-4 text-slate-300" />
                <span>Belum ada rating</span>
            </div>
        );
    }

    return (
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-sm">
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-900">{rating.toFixed(1)}</span>
            </div>
            <span className="text-slate-500">({reviewCount})</span>
        </div>
    );
}
