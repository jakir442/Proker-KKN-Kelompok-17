"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/data-table";
import { APBDesTableData } from "@/types/apbdes";
import { APBDesDialog } from "./APBDesDialog";
import { DeleteAPBDesDialog } from "./DeleteAPBDesDialog";
import { columns } from "./APBDesColumns";
import { activateAPBDesAction } from "@/actions/apbdes/apbdes";

interface Props {
    data: APBDesTableData[];
}

export function APBDesTable({ data }: Props) {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedAPBDes, setSelectedAPBDes] = useState<APBDesTableData | null>(null);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (apbdes) => {
                    setSelectedAPBDes(apbdes);
                    setOpen(true);
                },

                onDelete: (apbdes) => {
                    setSelectedAPBDes(apbdes);
                    setDeleteOpen(true);
                },

                onActivate: async (apbdes) => {
                    const result = await activateAPBDesAction(apbdes.id);

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

            {selectedAPBDes && (
                <APBDesDialog
                    mode="edit"
                    open={open}
                    onOpenChange={setOpen}
                    apbdes={selectedAPBDes}
                />
            )}

            {selectedAPBDes && (
                <DeleteAPBDesDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selectedAPBDes.id}
                />
            )}
        </>
    );
}
