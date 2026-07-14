"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import type { IService } from "@/types/service";

export type ServiceColumn = Omit<IService, "_id" | "createdAt" | "updatedAt"> & {
    id: string;
};

interface ColumnProps {
    onEdit: (service: ServiceColumn) => void;
    onDelete: (service: ServiceColumn) => void;
    onStatus: (service: ServiceColumn) => void;
}

export const columns = ({
    onEdit,
    onDelete,
    onStatus,
}: ColumnProps): ColumnDef<ServiceColumn>[] => [
    {
        accessorKey: "title",
        header: "Layanan",

        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />

                <div>
                    <p className="font-medium">{row.original.title}</p>

                    <p className="text-xs text-muted-foreground">{row.original.slug}</p>
                </div>
            </div>
        ),
    },

    {
        accessorKey: "duration",
        header: "Estimasi",
    },

    {
        accessorKey: "fee",
        header: "Biaya",
    },

    {
        accessorKey: "requirements",
        header: "Persyaratan",

        cell: ({ row }) => (
            <Badge variant="secondary">{row.original.requirements.length} Persyaratan</Badge>
        ),
    },

    {
        accessorKey: "isPublished",
        header: "Status",

        cell: ({ row }) => (
            <Badge variant={row.original.isPublished ? "default" : "secondary"}>
                {row.original.isPublished ? "Published" : "Draft"}
            </Badge>
        ),
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
                    <DropdownMenuItem onClick={() => onEdit(row.original)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onStatus(row.original)}>
                        {row.original.isPublished ? "Jadikan Draft" : "Publikasikan"}
                    </DropdownMenuItem>

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
