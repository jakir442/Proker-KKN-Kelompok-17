"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { OfficialDialog } from "./OfficialDialog";

interface Props {
    search: string;
    status: string;
}

export function OfficialToolbar({
    search,
    status,
}: Props) {
    const router = useRouter();

    const searchParams = useSearchParams();

    const [open, setOpen] = useState(false);

    function updateQuery(key: string, value: string | null) {
        const params = new URLSearchParams(searchParams.toString());

        if (!value || value === "ALL") {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        params.delete("page");

        router.push(`?${params.toString()}`);
    }

    return (
        <>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div className="flex flex-1 gap-3">

                    <div className="relative flex-1">

                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                        <Input
                            defaultValue={search}
                            placeholder="Cari nama atau jabatan..."
                            className="pl-9"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    updateQuery(
                                        "search",
                                        e.currentTarget.value,
                                    );
                                }
                            }}
                        />

                    </div>

                    <Select
                        value={status}
                        onValueChange={(value) =>
                            updateQuery("status", value)
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="ALL">
                                Semua
                            </SelectItem>

                            <SelectItem value="ACTIVE">
                                Aktif
                            </SelectItem>

                            <SelectItem value="INACTIVE">
                                Nonaktif
                            </SelectItem>
                        </SelectContent>
                    </Select>

                </div>

                <Button onClick={() => setOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />

                    Tambah Perangkat
                </Button>

            </div>

            <OfficialDialog
                open={open}
                onOpenChange={setOpen}
                mode="create"
            />
        </>
    );
}