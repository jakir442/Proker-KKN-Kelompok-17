import { CalendarClock, CheckCircle2, Clock3 } from "lucide-react";

interface EventStatsProps {
    upcoming: number;
    ongoing: number;
    completed: number;
}

export function EventStats({ upcoming, ongoing, completed }: EventStatsProps) {
    const stats = [
        {
            title: "Akan Datang",
            value: upcoming,
            icon: CalendarClock,
            color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
        },
        {
            title: "Berlangsung",
            value: ongoing,
            icon: Clock3,
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
        {
            title: "Selesai",
            value: completed,
            icon: CheckCircle2,
            color: "bg-muted text-muted-foreground",
        },
    ];

    return (
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="rounded-3xl border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className={`inline-flex rounded-2xl p-3 ${item.color}`}>
                            <Icon className="h-5 w-5" />
                        </div>

                        <h3 className="mt-5 text-3xl font-bold">{item.value}</h3>

                        <p className="mt-1 text-sm text-muted-foreground">{item.title}</p>
                    </div>
                );
            })}
        </div>
    );
}
