import { CalendarDays, Clock3 } from "lucide-react";

interface Props {
    date: string;
    readingTime: string;
    category: string;
}

export function NewsReadingInfo({ date, readingTime, category }: Props) {
    return (
        <section className="mb-12 rounded-3xl border bg-muted/20 p-6">
            <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                    {category}
                </span>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4" />
                    {date}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock3 className="size-4" />
                    {readingTime}
                </div>
            </div>
        </section>
    );
}
