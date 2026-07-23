"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { toggleServiceStatusAction } from "@/actions/service/toggle-service-status";
import { columns, ServiceColumn } from "./ServiceColumns";
import { DeleteServiceDialog } from "./DeleteServiceDialog";
import { EditServiceDialog } from "./EditServiceDialog";

interface Props {
    data: ServiceColumn[];
}

export function ServiceTable({ data }: Props) {
    const router = useRouter();

    const [selected, setSelected] = useState<ServiceColumn | null>(null);

    const [editOpen, setEditOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (service) => {
                    setSelected(service);
                    setEditOpen(true);
                },

                onDelete: (service) => {
                    setSelected(service);
                    setDeleteOpen(true);
                },

                onStatus: async (service) => {
                    const result = await toggleServiceStatusAction(
                        service.id,
                        !service.isPublished,
                    );

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
                <EditServiceDialog open={editOpen} onOpenChange={setEditOpen} service={selected} />
            )}

            {selected && (
                <DeleteServiceDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selected.id}
                />
            )}
        </>
    );
}
