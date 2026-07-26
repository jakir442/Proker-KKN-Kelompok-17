"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { AnnouncementTableData } from "@/types/announcement";

import { AnnouncementTable } from "./announcement-table";
import { CreateAnnouncementDialog } from "./CreateAnnouncementDialog";
import { toggleAnnouncementPublishAction } from "@/actions/announcements/announcements";

interface AnnouncementClientProps {
    announcements: AnnouncementTableData[];
    search: string;
    category: string;
    status: string;
}

export function AnnouncementClient({
    announcements,
    search,
    category,
    status,
}: AnnouncementClientProps) {
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

    async function handlePublish(announcement: AnnouncementTableData) {
        const result = await toggleAnnouncementPublishAction(
            announcement.id,
            !announcement.published,
        );

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);
        router.refresh();
    }

    return (
        <>
            <AnnouncementTable
                data={announcements}
                search={search}
                category={category}
                status={status}
                onSearchChange={(value) => updateQuery("search", value)}
                onCategoryChange={(value) => updateQuery("category", value)}
                onStatusChange={(value) => updateQuery("status", value)}
                onSearchClear={() => updateQuery("search", "")}
                onCreate={() => setCreateOpen(true)}
                onPublish={handlePublish}
            />

            <CreateAnnouncementDialog open={createOpen} onOpenChange={setCreateOpen} />
        </>
    );
}
