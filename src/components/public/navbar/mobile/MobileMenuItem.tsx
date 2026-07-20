"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/config/navigation";

interface MobileMenuItemProps {
    item: NavigationItem;
    onNavigate?: () => void;
}

export function MobileMenuItem({ item, onNavigate }: MobileMenuItemProps) {
    const pathname = usePathname();

    const active = pathname === item.href;

    const Icon = item.icon;

    return (
        <motion.div
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
        >
            <Link
                href={item.href!}
                onClick={onNavigate}
                className={cn(
                    "group relative flex min-h-14 items-center justify-between overflow-hidden rounded-2xl border px-4 py-3 transition-all duration-300",
                    active
                        ? "border-primary/20 bg-primary/10 shadow-sm"
                        : "border-transparent hover:border-border hover:bg-muted/60 active:scale-[0.98]",
                )}
            >
                {/* Active Indicator */}
                {active && (
                    <motion.span
                        layoutId="mobile-active"
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-primary"
                        transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                        }}
                    />
                )}

                <div className="flex items-center gap-3">
                    <div
                        className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                            active
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                        )}
                    >
                        <Icon className="size-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p
                            className={cn(
                                "truncate text-[15px] font-medium transition-colors duration-300",
                                active ? "text-primary" : "text-foreground",
                            )}
                        >
                            {item.title}
                        </p>

                        {item.description && (
                            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center">
                    {active ? (
                        <Check className="size-4 text-primary" />
                    ) : (
                        <ArrowRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    )}
                </div>
            </Link>
        </motion.div>
    );
}
