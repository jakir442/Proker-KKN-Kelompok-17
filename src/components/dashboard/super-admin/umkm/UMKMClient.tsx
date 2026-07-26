"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { EmptyState } from "../common/EmptyState";

import type { UMKMColumn } from "./columns";
import { UMKMTable } from "./UMKMTable";
import { CreateUMKMDialog } from "./CreateUMKMDialog";

import { toggleUMKMActiveAction } from "@/actions/umkm/toggle-active";
import { toggleUMKMFeaturedAction } from "@/actions/umkm/toggle-featured";

interface UMKMClientProps {
    umkms: UMKMColumn[];

    search: string;
    category: string;
    status: string;
}

export function UMKMClient({ umkms, search, category, status }: UMKMClientProps) {
    const router = useRouter();
    const [createOpen, setCreateOpen] = useState(false);

    function updateQuery(key: string, value: string) {
        const params = new URLSearchParams(window.location.search);
        if (value && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    }

    async function handleFeatured(umkm: UMKMColumn) {
        const result = await toggleUMKMFeaturedAction(umkm.id);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);
        router.refresh();
    }

    async function handleActive(umkm: UMKMColumn) {
        const result = await toggleUMKMActiveAction(umkm.id);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);
        router.refresh();
    }

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <UMKMTable
                    data={umkms}
                    search={search}
                    category={category}
                    status={status}
                    onSearchChange={(value) => updateQuery("search", value)}
                    onCategoryChange={(value) => updateQuery("category", value)}
                    onStatusChange={(value) => updateQuery("status", value)}
                    onSearchClear={() => updateQuery("search", "")}
                    onCreate={() => setCreateOpen(true)}
                    onFeatured={handleFeatured}
                    onActive={handleActive}
                />
            </div>

            <CreateUMKMDialog open={createOpen} onOpenChange={setCreateOpen} />
        </div>
    );
}
