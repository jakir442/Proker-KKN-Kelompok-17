"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AnnouncementTableData } from "@/types/announcement";

interface ColumnProps {
    onEdit: (announcement: AnnouncementTableData) => void;
    onDelete: (announcement: AnnouncementTableData) => void;
    onPublish: (announcement: AnnouncementTableData) => void;
}

export const columns = ({
    onEdit,
    onDelete,
    onPublish,
}: ColumnProps): ColumnDef<AnnouncementTableData>[] => [
    {
        accessorKey: "coverImage",
        header: "Gambar",
        cell: ({ row }) => (
            <div className="relative h-14 w-20 overflow-hidden rounded-md border">
                <Image
                    src={row.original.coverImage}
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
        accessorKey: "category",
        header: "Kategori",
    },
    {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant={row.original.published ? "default" : "secondary"}>
                {row.original.published ? "Published" : "Draft"}
            </Badge>
        ),
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
                    <DropdownMenuItem onClick={() => onEdit(row.original)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onPublish(row.original)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <Badge variant={row.original.published ? "default" : "secondary"}>
                            {row.original.published ? "Draft" : "Publish"}
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
