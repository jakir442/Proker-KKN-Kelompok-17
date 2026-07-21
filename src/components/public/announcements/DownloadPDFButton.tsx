"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { FileDown, Loader2 } from "lucide-react";

import { AnnouncementPDF } from "./AnnouncementPDF";

interface Props {
    title: string;
    category: string;
    content: string;
    coverImage: string;
    publishedAt: string;
    mobile?: boolean;
}

export function DownloadPDFButton({
    title,
    category,
    content,
    coverImage,
    publishedAt,
    mobile,
}: Props) {
    const [loading, setLoading] = useState(false);
    const handleDownload = async () => {
        try {
            setLoading(true);
            const blob = await pdf(
                <AnnouncementPDF
                    title={title}
                    category={category}
                    content={content}
                    coverImage={coverImage}
                    publishedAt={publishedAt}
                />,
            ).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `Pengumuman-${title}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Gagal membuat PDF:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className={
                mobile
                    ? "flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium shadow-sm transition-all hover:border-primary hover:bg-primary/5"
                    : "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5"
            }
            aria-label="Download PDF"
            title="Download PDF"
        >
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <FileDown className="h-5 w-5" />
            )}
        </button>
    );
}
