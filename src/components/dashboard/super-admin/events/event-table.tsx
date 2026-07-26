"use client";

import { useMemo, useState } from "react";
import { Eye, EyeOff, Plus } from "lucide-react";
import { toast } from "sonner";

import {
    DataTable,
    TableToolbar,
    TableSearch,
    TableSelectFilter,
} from "@/components/data-display/table";

import { Button } from "@/components/ui/button";

import { columns, EventColumn } from "./event-columns";
import { DeleteEventDialog } from "./delete-event-dialog";
import { EditEventDialog } from "./EditEventDialog";

interface Props {
    data: EventColumn[];

    search: string;
    status: string;

    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSearchClear: () => void;

    onCreate: () => void;

    onPublish: (event: EventColumn) => Promise<void>;
}

export function EventTable({
    data,
    search,
    status,
    onSearchChange,
    onStatusChange,
    onSearchClear,
    onCreate,
    onPublish,
}: Props) {
    const [selected, setSelected] = useState<EventColumn | null>(null);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (event) => {
                    setSelected(event);
                    setEditOpen(true);
                },

                onDelete: (event) => {
                    setSelected(event);
                    setDeleteOpen(true);
                },

                onPublish,
            }),
        [onPublish],
    );

    return (
        <>
            <DataTable
                columns={tableColumns}
                data={data}
                toolbar={
                    <TableToolbar className="flex flex-col gap-4 xl:flex-row xl:items-center">
                        <div className="flex flex-1 flex-col gap-3 md:flex-row">
                            <div className="w-full lg:flex-1">
                                <TableSearch
                                    value={search}
                                    onValueChange={onSearchChange}
                                    onClear={onSearchClear}
                                    placeholder="Cari agenda..."
                                />
                            </div>

                            <div className="w-full sm:w-auto">
                                <TableSelectFilter
                                    value={status}
                                    onValueChange={onStatusChange}
                                    placeholder="Semua Status"
                                    items={[
                                        {
                                            label: "Dipublikasikan",
                                            value: "published",
                                            icon: Eye,
                                        },
                                        {
                                            label: "Draft",
                                            value: "draft",
                                            icon: EyeOff,
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <Button onClick={onCreate} className="w-full sm:w-auto">
                            <Plus className="mr-2 size-4" />
                            Tambah Agenda
                        </Button>
                    </TableToolbar>
                }
            />

            {selected && (
                <EditEventDialog open={editOpen} onOpenChange={setEditOpen} event={selected} />
            )}

            {selected && (
                <DeleteEventDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selected.id}
                />
            )}
        </>
    );
}
