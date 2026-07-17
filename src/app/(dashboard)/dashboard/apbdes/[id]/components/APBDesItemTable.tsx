"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";

import { APBDesItemTableData } from "@/types/apbdes-item";
import { columns } from "./APBDesItemColumns";
import { APBDesItemDialog } from "./APBDesItemDialog";
import { DeleteAPBDesItemDialog } from "./DeleteAPBDesItemDialog";

interface Props {
    apbdesId: string;
    data: APBDesItemTableData[];
}

export function APBDesItemTable({ apbdesId, data }: Props) {
    const [open, setOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState<APBDesItemTableData | null>(null);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (item) => {
                    setSelectedItem(item);
                    setOpen(true);
                },

                onDelete: (item) => {
                    setSelectedItem(item);
                    setDeleteOpen(true);
                },
            }),
        [],
    );

    return (
        <>
            <DataTable columns={tableColumns} data={data} searchColumn="name" />

            {selectedItem && (
                <APBDesItemDialog
                    mode="edit"
                    open={open}
                    onOpenChange={setOpen}
                    apbdesId={apbdesId}
                    item={selectedItem}
                />
            )}

            {selectedItem && (
                <DeleteAPBDesItemDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selectedItem.id}
                />
            )}
        </>
    );
}
