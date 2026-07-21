"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "@/hooks/use-debounce";

import { EventCard } from "./EventCard";
import { EventEmpty } from "./EventEmpty";
import { EventFilter, type EventFilterValue } from "./EventFilter";
import { EventSearch } from "./EventSearch";
import { FeaturedEventCard } from "./FeaturedEventCard";

type Event = {
    id: string;
    slug: string;
    title: string;
    description: string;
    coverImage: string;
    location: string;
    startDate: string;
    endDate: string;
};

interface EventExplorerProps {
    upcoming: Event[];
    ongoing: Event[];
    completed: Event[];
}

export function EventExplorer({ upcoming, ongoing, completed }: EventExplorerProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const initialQuery = searchParams.get("search") ?? "";

    const [query, setQuery] = useState(initialQuery);

    const debouncedQuery = useDebounce(query, 300);

    const filter = (searchParams.get("status") as EventFilterValue) ?? "all";

    /**
     * Sinkronkan input ketika URL berubah
     * (Back / Forward browser)
     */
    useEffect(() => {
        if (query === initialQuery) {
            return;
        }
        const timer = setTimeout(() => {
            setQuery(initialQuery);
        }, 0);
        return () => clearTimeout(timer);
    }, [initialQuery, query]);

    const updateSearchParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!value || value === "all") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        const next = params.toString();
        const current = searchParams.toString();

        if (next === current) {
            return;
        }

        router.replace(next ? `${pathname}?${next}` : pathname, {
            scroll: false,
        });
    };

    /**
     * Update URL setelah debounce
     */
    useEffect(() => {
        updateSearchParams("search", debouncedQuery);
    }, [debouncedQuery]);

    const events = useMemo(() => {
        switch (filter) {
            case "upcoming":
                return upcoming;

            case "ongoing":
                return ongoing;

            case "completed":
                return completed;

            default:
                return [...ongoing, ...upcoming, ...completed];
        }
    }, [filter, upcoming, ongoing, completed]);

    const filtered = useMemo(() => {
        const keyword = debouncedQuery.trim().toLowerCase();

        if (!keyword) {
            return events;
        }

        return events.filter((event) => {
            return (
                event.title.toLowerCase().includes(keyword) ||
                event.description.toLowerCase().includes(keyword) ||
                event.location.toLowerCase().includes(keyword)
            );
        });
    }, [events, debouncedQuery]);

    const [featured, ...others] = filtered;

    return (
        <div className="mt-14 space-y-10">
            <div className="rounded-3xl border bg-background p-5 shadow-sm">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <EventSearch value={query} onChange={setQuery} />

                    <EventFilter
                        value={filter}
                        onChange={(value) => updateSearchParams("status", value)}
                        counts={{
                            all: upcoming.length + ongoing.length + completed.length,
                            upcoming: upcoming.length,
                            ongoing: ongoing.length,
                            completed: completed.length,
                        }}
                    />
                </div>
            </div>

            {filtered.length === 0 ? (
                <EventEmpty />
            ) : (
                <>
                    {featured && <FeaturedEventCard event={featured} />}

                    {others.length > 0 && (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {others.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
