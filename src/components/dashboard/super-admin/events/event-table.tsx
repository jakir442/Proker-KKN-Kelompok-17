"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/data-table";

import { columns, EventColumn } from "./event-columns";
import { EventDialog } from "./event-dialog";
import { toggleEventPublishAction } from "@/actions/events/events";
import { DeleteEventDialog } from "./delete-event-dialog";

interface Props {
    data: EventColumn[];
}

export function EventTable({ data }: Props) {
    const router = useRouter();
    const [selectedEvent, setSelectedEvent] = useState<EventColumn | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (event) => {
                    setSelectedEvent(event);
                    setEditOpen(true);
                },
                onDelete: (event) => {
                    setSelectedEvent(event);
                    setDeleteOpen(true);
                },
                onPublish: async (event) => {
                    const result = await toggleEventPublishAction(event.id, !event.published);
                    if (!result.success) {
                        alert(result.message);
                        return;
                    }
                    router.refresh();
                },
            }),
        [router],
    );

    return (
        <>
            <DataTable columns={tableColumns} data={data} />

            {selectedEvent && (
                <EventDialog
                    mode="edit"
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    event={selectedEvent}
                />
            )}

            {selectedEvent && (
                <DeleteEventDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selectedEvent.id}
                />
            )}
        </>
    );
}
