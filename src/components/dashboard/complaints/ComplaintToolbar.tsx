"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function ComplaintToolbar() {
    const router = useRouter();
    const params = useSearchParams();

    function updateQuery(key: string, value: string | null) {
        const search = new URLSearchParams(params.toString());

        if (!value || value === "ALL") {
            search.delete(key);
        } else {
            search.set(key, value);
        }

        router.push(
            `/dashboard/complaints?${search.toString()}`
        );
    }

    return (
        <div className="flex flex-col gap-3 md:flex-row">

            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                    placeholder="Cari nama, judul..."
                    defaultValue={
                        params.get("search") ?? ""
                    }
                    className="pl-9"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            updateQuery(
                                "search",
                                e.currentTarget.value
                            );
                        }
                    }}
                />
            </div>

            <Select
                defaultValue={
                    params.get("status") ??
                    "ALL"
                }
                onValueChange={(v) =>
                    updateQuery("status", v)
                }
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="ALL">
                        Semua Status
                    </SelectItem>

                    <SelectItem value="PENDING">
                        Pending
                    </SelectItem>

                    <SelectItem value="PROCESS">
                        Diproses
                    </SelectItem>

                    <SelectItem value="DONE">
                        Selesai
                    </SelectItem>

                    <SelectItem value="REJECTED">
                        Ditolak
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select
                defaultValue={
                    params.get("category") ??
                    "ALL"
                }
                onValueChange={(v) =>
                    updateQuery("category", v)
                }
            >
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Kategori" />
                </SelectTrigger>

                <SelectContent>

                    <SelectItem value="ALL">
                        Semua Kategori
                    </SelectItem>

                    <SelectItem value="INFRASTRUKTUR">
                        Infrastruktur
                    </SelectItem>

                    <SelectItem value="PELAYANAN">
                        Pelayanan
                    </SelectItem>

                    <SelectItem value="LINGKUNGAN">
                        Lingkungan
                    </SelectItem>

                    <SelectItem value="SOSIAL">
                        Sosial
                    </SelectItem>

                    <SelectItem value="LAINNYA">
                        Lainnya
                    </SelectItem>

                </SelectContent>
            </Select>

        </div>
    );
}