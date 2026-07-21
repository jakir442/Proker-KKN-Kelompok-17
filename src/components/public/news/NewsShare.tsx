"use client";

import { useState } from "react";
import { Check, Copy, Link2, Share2 } from "lucide-react";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { AiFillFacebook } from "react-icons/ai";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsShareProps {
    title: string;
    url: string;
}

export function NewsShare({ title, url }: NewsShareProps) {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const socials = [
        {
            name: "WhatsApp",
            href: "...",
            icon: FaWhatsapp,
            className:
                "border-green-200 bg-green-50/50 hover:bg-green-50 hover:border-green-400 hover:text-green-700",
            iconClass: "text-green-600",
        },
        {
            name: "Facebook",
            href: "...",
            icon: AiFillFacebook,
            className:
                "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700",
            iconClass: "text-blue-600",
        },
        {
            name: "X",
            href: "...",
            icon: FaXTwitter,
            className: "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-500",
            iconClass: "text-slate-900 dark:text-white",
        },
    ];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);

            setCopied(true);

            toast.success("Tautan berhasil disalin.");

            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Gagal menyalin tautan.");
        }
    };

    const nativeShare = async () => {
        if (!navigator.share) return;

        try {
            await navigator.share({
                title,
                url,
            });
        } catch {
            // User cancelled
        }
    };

    return (
        <section className="rounded-3xl border bg-card/80 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Bagikan Berita</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Bagikan informasi ini kepada masyarakat.
                    </p>
                </div>

                {"share" in navigator && (
                    <Button variant="secondary" onClick={nativeShare} className="rounded-xl">
                        <Share2 className="mr-2 h-4 w-4" />
                        Bagikan
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {socials.map((item) => {
                    const Icon = item.icon;

                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "flex h-16 items-center gap-3 rounded-2xl border px-5 font-medium transition-all duration-300",
                                "hover:-translate-y-1 hover:shadow-lg",
                                item.className,
                            )}
                        >
                            <Icon className={cn("h-5 w-5 shrink-0", item.iconClass)} />

                            <span>{item.name}</span>
                        </a>
                    );
                })}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border bg-muted/40 px-4 py-3">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <p className="truncate text-sm text-muted-foreground">{url}</p>
            </div>
        </section>
    );
}
