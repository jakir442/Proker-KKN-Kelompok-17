"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Plus } from "lucide-react";

import { TOURISM_CATEGORIES } from "@/constants/tourism";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CreateTourismDialog } from "./CreateTourismDialog";

interface Props {
    search: string;
    category: string;
    status: string;
}

export function TourismToolbar({ search, category, status }: Props) {
    const router = useRouter();
    const params = useSearchParams();

    const [open, setOpen] = useState(false);

    function updateQuery(key: string, value: string | null) {
        const query = new URLSearchParams(params?.toString() ?? "");

        if (value && value !== "ALL") {
            query.set(key, value);
        } else {
            query.delete(key);
        }

        query.set("page", "1");

        router.push(`?${query.toString()}`);
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 flex-col gap-2 md:flex-row">
                <Input
                    value={search}
                    onChange={(e) => updateQuery("search", e.target.value)}
                    placeholder="Cari destinasi wisata..."
                    className="md:max-w-sm"
                />

                <Select value={category} onValueChange={(value) => updateQuery("category", value)}>
                    <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Kategori" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">Semua Kategori</SelectItem>

                        {TOURISM_CATEGORIES.map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={status} onValueChange={(value) => updateQuery("status", value)}>
                    <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">Semua</SelectItem>

                        <SelectItem value="published">Published</SelectItem>

                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Wisata
            </Button>

            <CreateTourismDialog open={open} onOpenChange={setOpen} />
        </div>
    );
}
