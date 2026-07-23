"use client";

import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";
import { columns, NewsColumn } from "./columns";
import { EditNewsDialog } from "./edit-news-dialog";
import { DeleteNewsDialog } from "./delete-news-dialog";
import { togglePublishAction } from "@/actions/news";
import { useRouter } from "next/navigation";

interface Props {
    data: NewsColumn[];
}

export function NewsTable({ data }: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState<NewsColumn | null>(null);

    const tableColumns = useMemo(
        () =>
            columns({
                onEdit: (news: NewsColumn) => {
                    setSelectedNews(news);
                    setOpen(true);
                },
                onDelete: (news: NewsColumn) => {
                    setSelectedNews(news);
                    setDeleteOpen(true);
                },
                onPublish: async (news) => {
                    const result = await togglePublishAction(news.id, !news.published);

                    if (!result.success) {
                        alert(result.message);
                        return;
                    }

                    router.refresh();
                },
            }),
        [],
    );

    return (
        <>
            <DataTable columns={tableColumns} data={data} />

            {selectedNews && (
                <EditNewsDialog open={open} onOpenChange={setOpen} news={selectedNews} />
            )}
            {selectedNews && (
                <DeleteNewsDialog
                    open={deleteOpen}
                    onOpenChange={setDeleteOpen}
                    id={selectedNews.id}
                />
            )}
        </>
    );
}
