"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

import { APBDesItemTableData } from "@/types/apbdes-item";
import { CategoryBadge } from "./CategoryBadge";

interface ColumnProps {
    onEdit: (item: APBDesItemTableData) => void;
    onDelete: (item: APBDesItemTableData) => void;
}

const currency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

export const columns = ({ onEdit, onDelete }: ColumnProps): ColumnDef<APBDesItemTableData>[] => [
    {
        accessorKey: "category",
        header: "Kategori",
        cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    },
    {
        accessorKey: "name",
        header: "Nama",
    },
    {
        accessorKey: "budget",
        header: "Anggaran",
        cell: ({ row }) => currency.format(row.original.budget),
    },
    {
        accessorKey: "realization",
        header: "Realisasi",
        cell: ({ row }) => currency.format(row.original.realization),
    },
    {
        id: "progress",
        header: "Progress",
        cell: ({ row }) => {
            const budget = row.original.budget;
            const realization = row.original.realization;

            const percentage =
                budget === 0 ? 0 : Math.min(Math.round((realization / budget) * 100), 100);

            return (
                <div className="w-40 space-y-2">
                    <Progress value={percentage} />

                    <p className="text-xs text-muted-foreground">{percentage}%</p>
                </div>
            );
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
                    <DropdownMenuItem onClick={() => onEdit(row.original)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
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
