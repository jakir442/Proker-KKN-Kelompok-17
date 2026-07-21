"use client";

export type EventFilterValue = "all" | "upcoming" | "ongoing" | "completed";

interface EventFilterProps {
    value: EventFilterValue;

    onChange: (value: EventFilterValue) => void;

    counts: {
        all: number;
        upcoming: number;
        ongoing: number;
        completed: number;
    };
}

const filters = [
    {
        value: "all",
        label: "Semua",
    },
    {
        value: "upcoming",
        label: "Akan Datang",
    },
    {
        value: "ongoing",
        label: "Berlangsung",
    },
    {
        value: "completed",
        label: "Selesai",
    },
] as const;

export function EventFilter({ value, onChange, counts }: EventFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
                <button
                    key={item.value}
                    onClick={() => onChange(item.value)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        value === item.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted"
                    }`}
                >
                    {item.label}

                    <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                            value === item.value ? "bg-white/20" : "bg-muted"
                        }`}
                    >
                        {counts[item.value]}
                    </span>
                </button>
            ))}
        </div>
    );
}
