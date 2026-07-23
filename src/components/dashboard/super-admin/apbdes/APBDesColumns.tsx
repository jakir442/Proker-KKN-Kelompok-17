"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { APBDesTableData } from "@/types/apbdes";
import { APBDesStatus } from "@/constants/apbdes";

interface ColumnProps {
    onEdit: (apbdes: APBDesTableData) => void;
    onDelete: (apbdes: APBDesTableData) => void;
    onActivate: (apbdes: APBDesTableData) => void;
}

export const columns = ({
    onEdit,
    onDelete,
    onActivate,
}: ColumnProps): ColumnDef<APBDesTableData>[] => [
    {
        accessorKey: "year",
        header: "Tahun",
    },
    {
        accessorKey: "title",
        header: "Judul",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;

            switch (status) {
                case APBDesStatus.ACTIVE:
                    return <Badge className="bg-green-600 hover:bg-green-600">Aktif</Badge>;

                case APBDesStatus.DRAFT:
                    return <Badge variant="secondary">Draft</Badge>;

                case APBDesStatus.ARCHIVED:
                    return <Badge variant="outline">Arsip</Badge>;

                default:
                    return null;
            }
        },
    },
    {
        accessorKey: "createdAt",
        header: "Tanggal",
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);

            const tanggal = new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }).format(date);

            const jam = new Intl.DateTimeFormat("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }).format(date);

            return `${tanggal}, ${jam}`;
        },
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    }
                />

                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href={`/dashboard/apbdes/${row.original.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Detail
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEdit(row.original)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>

                    {row.original.status !== APBDesStatus.ACTIVE && (
                        <DropdownMenuItem onClick={() => onActivate(row.original)}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Jadikan Aktif
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(row.original)}
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
