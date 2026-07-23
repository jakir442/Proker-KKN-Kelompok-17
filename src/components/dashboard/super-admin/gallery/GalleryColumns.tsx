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

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

export interface GalleryColumn {
    id: string;
    title: string;
    description: string;
    album: string;
    image: string;
    takenAt: string;
    isPublished: boolean;
}

interface ColumnProps {
    onEdit: (gallery: GalleryColumn) => void;
    onDelete: (gallery: GalleryColumn) => void;
    onPublish: (gallery: GalleryColumn) => void;
}

export const columns = ({
    onEdit,
    onDelete,
    onPublish,
}: ColumnProps): ColumnDef<GalleryColumn>[] => [
    {
        accessorKey: "image",
        header: "Foto",
        cell: ({ row }) => (
            <div className="relative h-14 w-20 overflow-hidden rounded-md border">
                <Image
                    src={row.original.image}
                    alt={row.original.title}
                    fill
                    className="object-cover"
                />
            </div>
        ),
    },
    {
        accessorKey: "title",
        header: "Judul",
    },
    {
        accessorKey: "album",
        header: "Album",
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
        accessorKey: "takenAt",
        header: "Tanggal",
        cell: ({ row }) => {
            return new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }).format(new Date(row.original.takenAt));
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

                    <DropdownMenuItem onClick={() => onPublish(row.original)}>
                        <Eye className="mr-2 h-4 w-4" />

                        <Badge variant={row.original.isPublished ? "default" : "secondary"}>
                            {row.original.isPublished ? "Draft" : "Publish"}
                        </Badge>
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
