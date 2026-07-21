import { Sparkles } from "lucide-react";

interface SectionHeaderProps {
    badge: string;
    title: string;
    description: string;
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
    return (
        <div className="mx-auto mb-14 max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                <Sparkles className="h-4 w-4" />

                {badge}
            </div>

            <h2 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl xl:text-5xl">
                {title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                {description}
            </p>

            <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-400" />
        </div>
    );
}
