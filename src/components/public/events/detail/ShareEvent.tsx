"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

interface ShareEventProps {
    title: string;
}

export function ShareEvent({ title }: ShareEventProps) {
    const [copied, setCopied] = useState(false);

    const getUrl = () => {
        if (typeof window === "undefined") {
            return "";
        }

        return window.location.href;
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(getUrl());

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const shareWhatsApp = () => {
        const message = encodeURIComponent(
            `${title}\n\nLihat informasi lengkap agenda Desa Cintanagara:\n${getUrl()}`,
        );

        window.open(`https://wa.me/?text=${message}`, "_blank");
    };

    const nativeShare = async () => {
        if (!navigator.share) {
            copyLink();
            return;
        }

        await navigator.share({
            title,
            text: "Agenda Desa Cintanagara",
            url: getUrl(),
        });
    };

    return (
        <section className="rounded-3xl border bg-muted/30 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-bold">Bagikan Agenda Ini</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Bagikan informasi kegiatan desa kepada masyarakat sekitar.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={shareWhatsApp}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-green-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                        "
                    >
                        <FaWhatsapp className="h-4 w-4" />
                        WhatsApp
                    </button>

                    <button
                        onClick={copyLink}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            bg-background
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            transition
                            hover:bg-muted
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                        "
                    >
                        {copied ? (
                            <>
                                <Check className="h-4 w-4" />
                                Tersalin
                            </>
                        ) : (
                            <>
                                <Copy className="h-4 w-4" />
                                Copy Link
                            </>
                        )}
                    </button>

                    <button
                        onClick={nativeShare}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            bg-background
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            transition
                            hover:bg-muted
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-primary
                        "
                    >
                        <Share2 className="h-4 w-4" />
                        Lainnya
                    </button>
                </div>
            </div>
        </section>
    );
}
