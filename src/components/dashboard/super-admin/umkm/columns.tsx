"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { MoreHorizontal, Pencil, Trash2, Star, Store, CheckCircle2, CircleOff } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        header: () => <div className="text-right">Aksi</div>,
        enableSorting: false,

        cell: ({ row }) => (
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onEdit(row.original)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit UMKM
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onFeatured(row.original)}>
                                <Star className="mr-2 h-4 w-4" />
                                {row.original.featured ? "Hapus dari Unggulan" : "Jadikan Unggulan"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onActive(row.original)}>
                                {row.original.isActive ? (
                                    <>
                                        <CircleOff className="mr-2 h-4 w-4" />
                                        Nonaktifkan
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 className="mr-2 h-4 w-4" />
                                        Aktifkan
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => onDelete(row.original)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus UMKM
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];
