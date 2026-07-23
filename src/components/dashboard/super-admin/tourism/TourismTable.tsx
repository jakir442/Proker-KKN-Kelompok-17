"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/data-table";

import { columns, TourismColumn } from "./columns";

import { toggleTourismFeaturedAction } from "@/actions/tourism/toggle-featured";
import { toggleTourismStatusAction } from "@/actions/tourism/toggle-status";

import { DeleteTourismDialog } from "./DeleteTourismDialog";
import { EditTourismDialog } from "./EditTourismDialog";

interface Props {
    data: TourismColumn[];
}

export function TourismTable({ data }: Props) {
    const router = useRouter();

    const [selected, setSelected] = useState<TourismColumn | null>(null);

    const [editOpen, setEditOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (tourism) => {
                    setSelected(tourism);
                    setEditOpen(true);
                },

                onDelete: (tourism) => {
                    setSelected(tourism);
                    setDeleteOpen(true);
                },

                onFeatured: async (tourism) => {
                    const result = await toggleTourismFeaturedAction(tourism.id);

                    if (!result.success) {
                        alert(result.message);
                        return;
                    }

                    router.refresh();
                },

                onStatus: async (tourism) => {
                    const result = await toggleTourismStatusAction(tourism.id);

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
            <DataTable columns={tableColumns} data={data} showToolbar={false} />

            {selected && (
                <EditTourismDialog open={editOpen} onOpenChange={setEditOpen} tourism={selected} />
            )}

            {selected && (
                <DeleteTourismDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selected.id}
                />
            )}
        </>
    );
}
