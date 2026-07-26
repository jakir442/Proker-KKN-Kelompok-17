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
    latitude: number;
    longitude: number;
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

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
});

function getEventStatus(startDate: string, endDate: string) {
    const now = new Date();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) {
        return {
            label: "Akan Datang",
            variant: "secondary" as const,
        };
    }

    if (now <= end) {
        return {
            label: "Berlangsung",
            variant: "default" as const,
        };
    }

    return {
        label: "Selesai",
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
                    src={row.original.coverImage || "/noise.png"}
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
        cell: ({ row }) => (
            <div className="min-w-0">
                <p className="truncate font-medium">{row.original.title}</p>

                <p className="truncate text-xs text-muted-foreground">{row.original.location}</p>
            </div>
        ),
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
                {row.original.published ? "Dipublikasikan" : "Draft"}
            </Badge>
        ),
    },

    {
        accessorKey: "startDate",

        header: "Mulai",

        cell: ({ row }) => dateFormatter.format(new Date(row.original.startDate)),
    },

    {
        accessorKey: "endDate",

        header: "Selesai",

        cell: ({ row }) => dateFormatter.format(new Date(row.original.endDate)),
    },

    {
        id: "actions",

        header: "Aksi",

        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="size-4" />
                        </Button>
                    }
                />

                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(row.original)}>
                        <Pencil className="mr-2 size-4" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onPublish(row.original)}>
                        <Eye className="mr-2 size-4" />
                        {row.original.published ? "Jadikan Draft" : "Publikasikan"}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(row.original)}
                    >
                        <Trash2 className="mr-2 size-4" />
                        Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];
