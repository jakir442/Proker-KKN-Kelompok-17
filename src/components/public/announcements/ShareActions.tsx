"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2, Share2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { DownloadPDFButton } from "./DownloadPDFButton";

interface Props {
    title: string;
    category: string;
    content: string;
    coverImage: string;
    publishedAt: string;
}

export function ShareActions({ title, category, content, coverImage, publishedAt }: Props) {
    const [copied, setCopied] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(true);
    const [desktopOpen, setDesktopOpen] = useState(true);

    const mobileRef = useRef<HTMLDivElement>(null);
    const desktopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
                setMobileOpen(false);
            }
            if (desktopRef.current && !desktopRef.current.contains(event.target as Node)) {
                setDesktopOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const getUrl = () => window.location.href;

    const openWindow = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer");

        setMobileOpen(false);
        setDesktopOpen(false);
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(getUrl());

        setCopied(true);
        setMobileOpen(false);
        setDesktopOpen(false);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const desktopButton =
        "flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5";

    const mobileButton =
        "flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium shadow-sm transition-all hover:border-primary hover:bg-primary/5";

    return (
        <>
            {/* ================= MOBILE / TABLET ================= */}
            <aside className="mb-8 xl:hidden">
                <div
                    ref={mobileRef}
                    className="overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-lg backdrop-blur"
                >
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="flex w-full items-center justify-between px-5 py-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-primary/10 p-2">
                                <Share2 className="h-5 w-5 text-primary" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold">Bagikan Pengumuman</p>
                                <p className="text-xs text-muted-foreground">
                                    WhatsApp • Link • PDF
                                </p>
                            </div>
                        </div>

                        <motion.div
                            animate={{
                                rotate: mobileOpen ? 180 : 0,
                            }}
                        >
                            <Share2 className="h-5 w-5 text-muted-foreground" />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                animate={{
                                    opacity: 1,
                                    height: "auto",
                                }}
                                exit={{
                                    opacity: 0,
                                    height: 0,
                                }}
                                transition={{
                                    duration: 0.25,
                                }}
                                className="border-t border-border/60"
                            >
                                <div className="grid grid-cols-3 gap-3 p-4">
                                    <motion.button
                                        whileTap={{
                                            scale: 0.96,
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        onClick={() =>
                                            openWindow(
                                                `https://wa.me/?text=${encodeURIComponent(
                                                    `${title}\n${getUrl()}`,
                                                )}`,
                                            )
                                        }
                                        className={mobileButton}
                                    >
                                        <FaWhatsapp className="text-lg text-green-600" />
                                        <span>WhatsApp</span>
                                    </motion.button>

                                    <motion.button
                                        whileTap={{
                                            scale: 0.96,
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        onClick={copyLink}
                                        className={mobileButton}
                                    >
                                        {copied ? (
                                            <Check className="h-5 w-5 text-emerald-600" />
                                        ) : (
                                            <Link2 className="h-5 w-5" />
                                        )}

                                        <span>{copied ? "Tersalin" : "Salin"}</span>
                                    </motion.button>

                                    <DownloadPDFButton
                                        title={title}
                                        category={category}
                                        content={content}
                                        coverImage={coverImage}
                                        publishedAt={publishedAt}
                                        mobile
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </aside>

            {/* ================= DESKTOP ================= */}
            <aside className="sticky top-24 hidden self-start xl:block">
                <div
                    ref={desktopRef}
                    className="flex flex-col items-center gap-3 rounded-3xl border border-border/60 bg-background/90 p-3 shadow-xl backdrop-blur"
                >
                    <button
                        onClick={() => setDesktopOpen((prev) => !prev)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md"
                    >
                        <motion.div
                            animate={{
                                rotate: desktopOpen ? 45 : 0,
                            }}
                        >
                            <Share2 className="h-5 w-5" />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {desktopOpen && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: -10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -10,
                                }}
                                className="flex flex-col gap-2"
                            >
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    onClick={() =>
                                        openWindow(
                                            `https://wa.me/?text=${encodeURIComponent(
                                                `${title}\n${getUrl()}`,
                                            )}`,
                                        )
                                    }
                                    className={desktopButton}
                                >
                                    <FaWhatsapp className="text-green-600" />
                                </motion.button>

                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    onClick={copyLink}
                                    className={desktopButton}
                                >
                                    {copied ? <Check className="text-emerald-600" /> : <Link2 />}
                                </motion.button>

                                <DownloadPDFButton
                                    title={title}
                                    category={category}
                                    content={content}
                                    coverImage={coverImage}
                                    publishedAt={publishedAt}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </aside>
        </>
    );
}
