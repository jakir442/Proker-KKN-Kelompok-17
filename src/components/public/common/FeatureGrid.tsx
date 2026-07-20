import { LucideIcon } from "lucide-react";

interface FeatureItem {
    title: string;
    description: string;
    icon: LucideIcon;
}

interface FeatureGridProps {
    title?: string;
    description?: string;
    items: FeatureItem[];
}

export function FeatureGrid({ title, description, items }: FeatureGridProps) {
    return (
        <div className="mt-12">
            {(title || description) && (
                <div className="mb-6">
                    {title && <h4 className="text-lg font-semibold">{title}</h4>}

                    {description && <p className="mt-2 text-muted-foreground">{description}</p>}
                </div>
            )}

            <div className="grid gap-5 md:grid-cols-3">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="
                                group
                                rounded-2xl
                                border
                                bg-background/70
                                p-6
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-primary/30
                                hover:shadow-lg
                            "
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                                <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                            </div>

                            <h4 className="mt-5 font-semibold">{item.title}</h4>

                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
