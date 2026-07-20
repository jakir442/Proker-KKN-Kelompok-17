"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/config/navigation";

import { MobileMenuItem } from "./MobileMenuItem";

interface MobileMenuAccordionProps {
    item: NavigationItem;
    onNavigate?: () => void;
}

export function MobileMenuAccordion({ item, onNavigate }: MobileMenuAccordionProps) {
    const pathname = usePathname();
    const hasActiveChild = item.children?.some((child) => child.href === pathname) ?? false;
    const [open, setOpen] = useState(hasActiveChild);
    const Icon = item.icon;

    return (
        <motion.div
            layout
            variants={{
                hidden: {
                    opacity: 0,
                    x: 20,
                },
                show: {
                    opacity: 1,
                    x: 0,
                },
            }}
            transition={{
                layout: {
                    duration: 0.25,
                    ease: "easeOut",
                },
            }}
            className={cn(
                "overflow-hidden rounded-2xl border transition-all duration-300",
                open || hasActiveChild
                    ? "border-primary/20 bg-primary/5 shadow-sm"
                    : "border-border/50 hover:border-primary/10 hover:bg-muted/30",
            )}
        >
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-expanded={open}
                className="group flex w-full items-center justify-between px-4 py-4 text-left transition-colors"
            >
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            scale: open ? 1.05 : 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                        }}
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300",
                            open || hasActiveChild
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                        )}
                    >
                        <Icon className="size-5" />
                    </motion.div>

                    <div>
                        <p
                            className={cn(
                                "text-[15px] font-medium transition-colors",
                                open || hasActiveChild ? "text-primary" : "text-foreground",
                            )}
                        >
                            {item.title}
                        </p>

                        {item.description && (
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>

                <motion.div
                    animate={{
                        rotate: open ? 180 : 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                >
                    <ChevronDown className="size-5 text-muted-foreground" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{
                            height: 0,
                            opacity: 0,
                        }}
                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            variants={{
                                hidden: {},
                                show: {
                                    transition: {
                                        staggerChildren: 0.06,
                                    },
                                },
                            }}
                            initial="hidden"
                            animate="show"
                            className="space-y-2 px-3 pb-3"
                        >
                            {item.children?.map((child) => (
                                <MobileMenuItem
                                    key={child.href}
                                    item={child}
                                    onNavigate={onNavigate}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
