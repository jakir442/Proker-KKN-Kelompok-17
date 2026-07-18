"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/data-table";

import { columns, OfficialColumn } from "./OfficialColumns";

import { EditOfficialDialog } from "./EditOfficialDialog";
import { DeleteOfficialDialog } from "./DeleteOfficialDialog";

interface Props {
    data: OfficialColumn[];
}

export function OfficialTable({ data }: Props) {
    const router = useRouter();

    const [selected, setSelected] = useState<OfficialColumn | null>(null);

    const [editOpen, setEditOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (official) => {
                    setSelected(official);
                    setEditOpen(true);
                },

                onDelete: (official) => {
                    setSelected(official);
                    setDeleteOpen(true);
                },
            }),

        [],
    );

    return (
        <>
            <DataTable columns={tableColumns} data={data} showToolbar={false} />

            {selected && (
                <EditOfficialDialog
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    official={selected}
                />
            )}

            {selected && (
                <DeleteOfficialDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selected.id}
                />
            )}
        </>
    );
}
