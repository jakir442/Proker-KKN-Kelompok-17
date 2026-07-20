"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface NavigationChild {
    title: string;
    href: string;
}

interface NavigationDropdownProps {
    item: {
        title: string;
        children: NavigationChild[];
    };
}

export function NavigationDropdown({ item }: NavigationDropdownProps) {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    const active = item.children.some((child) => child.href === pathname);

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                aria-expanded={open}
                className={cn(
                    "group relative flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium transition-all duration-300",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
            >
                <span>{item.title}</span>

                <ChevronDown
                    className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
                />

                {active && (
                    <motion.span
                        layoutId="navbar-active"
                        className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                        transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                        }}
                    />
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.96,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 8,
                            scale: 0.96,
                        }}
                        transition={{
                            duration: 0.18,
                            ease: "easeOut",
                        }}
                        className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2"
                    >
                        <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-2 shadow-xl backdrop-blur-xl">
                            {item.children.map((child) => {
                                const isActive = pathname === child.href;

                                return (
                                    <Link
                                        key={child.href}
                                        href={child.href}
                                        className={cn(
                                            "group flex items-center rounded-xl px-4 py-3 transition-all duration-200",
                                            isActive
                                                ? "bg-primary/10 text-primary"
                                                : "hover:bg-muted",
                                        )}
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">
                                                {child.title}
                                            </span>

                                            <span className="text-xs text-muted-foreground">
                                                Jelajahi halaman {child.title}
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
