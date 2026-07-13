"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/data-table";

import { columns, UMKMColumn } from "./columns";

import { toggleUMKMActiveAction } from "@/actions/umkm/toggle-active";
import { toggleUMKMFeaturedAction } from "@/actions/umkm/toggle-featured";

import { DeleteUMKMDialog } from "./DeleteUMKMDialog";
import { EditUMKMDialog } from "./EditUMKMDialog";

interface Props {
    data: UMKMColumn[];
}

export function UMKMTable({ data }: Props) {
    const router = useRouter();

    const [selected, setSelected] = useState<UMKMColumn | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (umkm) => {
                    setSelected(umkm);
                    setEditOpen(true);
                },

                onDelete: (umkm) => {
                    setSelected(umkm);
                    setDeleteOpen(true);
                },

                onFeatured: async (umkm) => {
                    const result = await toggleUMKMFeaturedAction(umkm.id);

                    if (!result.success) {
                        alert(result.message);
                        return;
                    }

                    router.refresh();
                },

                onActive: async (umkm) => {
                    const result = await toggleUMKMActiveAction(umkm.id);

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
                <EditUMKMDialog open={editOpen} onOpenChange={setEditOpen} umkm={selected} />
            )}

            {selected && (
                <DeleteUMKMDialog open={deleteOpen} onOpenChange={setDeleteOpen} id={selected.id} />
            )}
        </>
    );
}
