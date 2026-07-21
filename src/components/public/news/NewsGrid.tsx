import { News } from "@/types/news";

import { Stagger } from "@/components/animations/Stagger";
import { NewsCard } from "./NewsCard";
import { NewsEmpty } from "./NewsEmpty";

interface NewsGridProps {
    news: News[];
}

export function NewsGrid({ news }: NewsGridProps) {
    if (news.length === 0) {
        return <NewsEmpty />;
    }

    return (
        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {news.map((item) => (
                <NewsCard key={item.id} news={item} />
            ))}
        </Stagger>
    );
}
