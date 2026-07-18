interface SectionHeaderProps {
    badge: string;
    title: string;
    description: string;
}

export function SectionHeader({ badge, title, description }: SectionHeaderProps) {
    return (
        <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                {badge}
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {title}
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
        </div>
    );
}
