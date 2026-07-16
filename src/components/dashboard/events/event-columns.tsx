"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { MoreHorizontal, Pencil, Trash2, Eye, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface EventColumn {
    id: string;

    title: string;
    slug: string;

    description: string;

    coverImage: string;

    location: string;

    startDate: string;
    endDate: string;

    published: boolean;

    createdAt: string;
}

interface ColumnProps {
    onEdit: (event: EventColumn) => void;
    onDelete: (event: EventColumn) => void;
    onPublish: (event: EventColumn) => void;
}

function getEventStatus(startDate: string, endDate: string) {
    const now = new Date();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
        return {
            label: "Upcoming",
            variant: "secondary" as const,
        };
    }

    if (now >= start && now <= end) {
        return {
            label: "Ongoing",
            variant: "default" as const,
        };
    }

    return {
        label: "Completed",
        variant: "outline" as const,
    };
}

export const columns = ({ onEdit, onDelete, onPublish }: ColumnProps): ColumnDef<EventColumn>[] => [
    {
        accessorKey: "coverImage",
        header: "Cover",

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
        accessorKey: "location",
        header: "Lokasi",
    },

    {
        id: "status",

        header: "Status Event",

        cell: ({ row }) => {
            const status = getEventStatus(row.original.startDate, row.original.endDate);

            return <Badge variant={status.variant}>{status.label}</Badge>;
        },
    },

    {
        accessorKey: "published",

        header: "Publish",

        cell: ({ row }) => (
            <Badge variant={row.original.published ? "default" : "secondary"}>
                {row.original.published ? "Published" : "Draft"}
            </Badge>
        ),
    },

    {
        accessorKey: "startDate",

        header: "Mulai",

        cell: ({ row }) => {
            return new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }).format(new Date(row.original.startDate));
        },
    },

    {
        accessorKey: "endDate",

        header: "Selesai",

        cell: ({ row }) => {
            return new Intl.DateTimeFormat("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }).format(new Date(row.original.endDate));
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

                        {row.original.published ? "Jadikan Draft" : "Publish"}
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
