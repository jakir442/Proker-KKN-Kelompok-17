"use client";

import { useMemo, useState } from "react";

import { IComplaint } from "@/models/complaint";
import { getComplaintColumns } from "./ComplaintColumns";
import { ComplaintDetailDialog } from "./ComplaintDetailDialog";
import { DataTable } from "@/components/data-table";
import { ComplaintToolbar } from "./ComplaintToolbar";
import { DeleteComplaintDialog } from "./DeleteComplaintDialog";

interface ComplaintTableProps {
    data: IComplaint[];
}

export function ComplaintTable({ data }: ComplaintTableProps) {
    const [selectedComplaint, setSelectedComplaint] = useState<IComplaint | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteComplaint, setDeleteComplaint] = useState<IComplaint | null>(null);

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
                id={deleteComplaint?._id.toString() ?? ""}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    );
}
