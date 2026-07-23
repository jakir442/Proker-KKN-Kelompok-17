"use client";

import { useState } from "react";

import type { IComplaint } from "@/models/complaint";

import { DataTable } from "@/components/data-table";
import { ComplaintToolbar } from "./ComplaintToolbar";
import { ComplaintDetailDialog } from "./ComplaintDetailDialog";
import { DeleteComplaintDialog } from "./DeleteComplaintDialog";
import { getComplaintColumns } from "./ComplaintColumns";

interface ComplaintTableProps {
    data: IComplaint[];
}

export function ComplaintTable({ data }: ComplaintTableProps) {
    const [selectedComplaint, setSelectedComplaint] = useState<IComplaint | null>(null);

    const [detailOpen, setDetailOpen] = useState(false);

    const [deleteComplaint, setDeleteComplaint] = useState<IComplaint | null>(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const columns = getComplaintColumns({
        onView: (complaint) => {
            setSelectedComplaint(complaint);
            setDetailOpen(true);
        },

        onDelete: (complaint) => {
            setDeleteComplaint(complaint);
            setDeleteOpen(true);
        },
    });

    return (
        <>
            <ComplaintToolbar />

            <DataTable columns={columns} data={data} />

            <ComplaintDetailDialog
                complaint={selectedComplaint}
                open={detailOpen}
                onOpenChange={setDetailOpen}
            />

            <DeleteComplaintDialog
                id={deleteComplaint?._id?.toString() ?? ""}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    );
}
