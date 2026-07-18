"use client";

import Image from "next/image";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPinned, MoreHorizontal, Pencil, Star, Trash2 } from "lucide-react";
import type { ITourism } from "@/types/tourism";

export type TourismColumn = Omit<ITourism, "_id" | "createdAt" | "updatedAt"> & {
    id: string;
};

interface ColumnProps {
    onEdit: (tourism: TourismColumn) => void;
    onDelete: (tourism: TourismColumn) => void;
    onFeatured: (tourism: TourismColumn) => void;
    onStatus: (tourism: TourismColumn) => void;
}

export const columns = ({
    onEdit,
    onDelete,
    onFeatured,
    onStatus,
}: ColumnProps): ColumnDef<TourismColumn>[] => [
    {
        accessorKey: "image",
        header: "Cover",

        cell: ({ row }) => (
            <div className="relative h-14 w-14 overflow-hidden rounded-lg border">
                {row.original.image ? (
                    <Image
                        src={row.original.image}
                        alt={row.original.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                        <MapPinned className="h-6 w-6 text-muted-foreground" />
                    </div>
                )}
            </div>
        ),
    },

    {
        accessorKey: "name",
        header: "Nama Wisata",
    },

    {
        accessorKey: "category",
        header: "Kategori",
    },

    {
        accessorKey: "address",
        header: "Alamat",
    },

    {
        accessorKey: "ticketPrice",
        header: "Harga Tiket",

        cell: ({ row }) =>
            row.original.ticketPrice
                ? `Rp ${row.original.ticketPrice.toLocaleString("id-ID")}`
                : "-",
    },

    {
        accessorKey: "featured",
        header: "Unggulan",

        cell: ({ row }) => (
            <Badge variant={row.original.featured ? "default" : "secondary"}>
                {row.original.featured ? "Ya" : "Tidak"}
            </Badge>
        ),
    },

    {
        accessorKey: "status",
        header: "Status",

        cell: ({ row }) => (
            <Badge variant={row.original.status === "published" ? "default" : "secondary"}>
                {row.original.status === "published" ? "Published" : "Draft"}
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

                    <DropdownMenuItem onClick={() => onFeatured(row.original)}>
                        <Star className="mr-2 h-4 w-4" />

                        {row.original.featured ? "Hapus Unggulan" : "Jadikan Unggulan"}
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onStatus(row.original)}>
                        {row.original.status === "published" ? "Jadikan Draft" : "Publikasikan"}
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
