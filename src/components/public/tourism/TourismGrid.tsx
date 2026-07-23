import type { TourismDocument } from "@/models/tourism";

import { TourismCard } from "./TourismCard";

interface Props {
    tourism: (TourismDocument & {
        _id: {
            toString(): string;
        };
    })[];
}

export function TourismGrid({ tourism }: Props) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {tourism.map((item) => (
                <TourismCard
                    key={item._id.toString()}
                    id={item._id.toString()}
                    slug={item.slug}
                    name={item.name}
                    image={item.image}
                    location={item.address}
                    description={item.shortDescription}
                    category={item.category}
                />
            ))}
        </div>
    );
}
