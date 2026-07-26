"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { EventColumn } from "./event-columns";

import { toggleEventPublishAction } from "@/actions/events/events";
import { EventTable } from "./event-table";
import { CreateEventDialog } from "./CreateEventDialog";

interface Props {
    events: EventColumn[];
    search: string;
    status: string;
}

export function EventClient({ events, search, status }: Props) {
    const router = useRouter();
    const [createOpen, setCreateOpen] = useState(false);

    function updateQuery(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);

        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.set("page", "1");

        router.push(`?${params.toString()}`);
    }

    async function handlePublish(event: EventColumn) {
        const result = await toggleEventPublishAction(event.id, !event.published);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);
        router.refresh();
    }

    return (
        <>
            <EventTable
                data={events}
                search={search}
                status={status}
                onSearchChange={(value) => updateQuery("search", value)}
                onStatusChange={(value) => updateQuery("status", value)}
                onSearchClear={() => updateQuery("search", "")}
                onCreate={() => setCreateOpen(true)}
                onPublish={handlePublish}
            />

            <CreateEventDialog open={createOpen} onOpenChange={setCreateOpen} />
        </>
    );
}
