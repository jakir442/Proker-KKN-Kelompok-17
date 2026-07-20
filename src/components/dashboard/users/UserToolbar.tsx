"use client";

import { Plus, Search } from "lucide-react";
import { ROLES } from "@/constants/roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UserToolbarProps {
    search?: string;
    role?: string;
    status?: string;

    onCreate: () => void;
}

export function UserToolbar({
    search = "",
    role = "ALL",
    status = "ALL",
    onCreate,
}: UserToolbarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function updateQuery(key: string, value: string) {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "ALL") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
            <form method="GET" className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        name="search"
                        defaultValue={search}
                        placeholder="Cari nama, username, email..."
                        className="pl-9"
                    />
                </div>

                <Button type="submit" variant="secondary">
                    Cari
                </Button>

                {/* Role */}
                <Select value={role} onValueChange={(value) => updateQuery("role", value ?? "ALL")}>
                    <SelectTrigger className="w-full md:w-180px">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">Semua Role</SelectItem>
                        <SelectItem value={ROLES.SUPER_ADMIN}>Super Admin</SelectItem>
                        <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
                        <SelectItem value={ROLES.UMKM}>UMKM</SelectItem>
                        <SelectItem value={ROLES.PETUGAS}>Petugas</SelectItem>
                    </SelectContent>
                </Select>

                {/* Status */}
                <Select
                    value={status}
                    onValueChange={(value) => updateQuery("status", value ?? "ALL")}
                >
                    <SelectTrigger className="w-full md:w-180px">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="ALL">Semua Status</SelectItem>
                        <SelectItem value="ACTIVE">Aktif</SelectItem>
                        <SelectItem value="INACTIVE">Nonaktif</SelectItem>
                    </SelectContent>
                </Select>
            </form>

            <Button onClick={onCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Tambah User
            </Button>
        </div>
    );
}
