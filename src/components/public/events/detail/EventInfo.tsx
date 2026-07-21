import { CalendarDays, Clock3, MapPin } from "lucide-react";

interface EventInfoProps {
    event: {
        startDate: string;
        endDate: string;
        location: string;
    };
}

export function EventInfo({ event }: EventInfoProps) {
    const tanggal = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(event.startDate));

    const jamMulai = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(event.startDate));

    const jamSelesai = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(new Date(event.endDate));

    const items = [
        {
            title: "Tanggal",
            value: tanggal,
            icon: CalendarDays,
        },
        {
            title: "Waktu",
            value: `${jamMulai} - ${jamSelesai} WIB`,
            icon: Clock3,
        },
        {
            title: "Lokasi",
            value: event.location,
            icon: MapPin,
        },
    ];

    return (
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="
                            group
                            rounded-3xl
                            border
                            bg-background
                            p-6
                            shadow-sm
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-lg
                        "
                    >
                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-2xl
                                bg-primary/10
                                text-primary
                                transition
                                group-hover:bg-primary
                                group-hover:text-primary-foreground
                            "
                        >
                            <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>

                        <div className="mt-5 space-y-2">
                            <p className="text-sm text-muted-foreground">{item.title}</p>

                            <p className="text-base font-semibold leading-relaxed">{item.value}</p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}
