"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Pencil, Trash2, Star, Store } from "lucide-react";

export interface UMKMColumn {
    id: string;
    name: string;
    description: string;
    logo: string;
    gallery: string[];
    owner: string;
    whatsapp: string;
    category: string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
    openTime: string;
    closeTime: string;
    featured: boolean;
    isActive: boolean;
}

interface ColumnProps {
    onEdit: (umkm: UMKMColumn) => void;
    onDelete: (umkm: UMKMColumn) => void;
    onFeatured: (umkm: UMKMColumn) => void;
    onActive: (umkm: UMKMColumn) => void;
}

export const columns = ({
    onEdit,
    onDelete,
    onFeatured,
    onActive,
}: ColumnProps): ColumnDef<UMKMColumn>[] => [
    {
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => (
            <div className="relative h-14 w-14 overflow-hidden rounded-lg border">
                {row.original.logo ? (
                    <Image
                        src={row.original.logo}
                        alt={row.original.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center bg-muted">
                        <Store className="h-6 w-6 text-muted-foreground" />
                    </div>
                )}
            </div>
        ),
    },

    {
        accessorKey: "name",
        header: "Nama UMKM",
    },

    {
        accessorKey: "category",
        header: "Kategori",
    },

    {
        accessorKey: "owner",
        header: "Pemilik",
    },

    {
        accessorKey: "whatsapp",
        header: "WhatsApp",
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
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.original.isActive ? "default" : "destructive"}>
                {row.original.isActive ? "Aktif" : "Nonaktif"}
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

                    <DropdownMenuItem onClick={() => onActive(row.original)}>
                        {row.original.isActive ? "Nonaktifkan" : "Aktifkan"}
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
