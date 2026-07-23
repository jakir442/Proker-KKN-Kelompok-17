"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IComplaint } from "@/models/complaint";
import { ComplaintStatusBadge } from "./ComplaintStatusBadge";
import { Badge } from "@/components/ui/badge";

interface Props {
    onView: (complaint: IComplaint) => void;
    onDelete: (complaint: IComplaint) => void;
}

export function getComplaintColumns({ onView, onDelete }: Props): ColumnDef<IComplaint>[] {
    return [
        {
            accessorKey: "ticketNumber",
            header: "Nomor Tiket",
            cell: ({ row }) => (
                <Badge variant="secondary" className="font-mono">
                    {row.original.ticketNumber}
                </Badge>
            ),
        },
        {
            accessorKey: "name",
            header: "Pelapor",
        },
        {
            accessorKey: "title",
            header: "Judul",
        },
        {
            accessorKey: "category",
            header: "Kategori",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <ComplaintStatusBadge status={row.original.status} />,
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => onView(row.original)}>
                        <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => onDelete(row.original)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];
}
