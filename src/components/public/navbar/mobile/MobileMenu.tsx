"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { navigation } from "@/config/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { MobileMenuHeader } from "./MobileMenuHeader";
import { MobileMenuItem } from "./MobileMenuItem";
import { MobileMenuAccordion } from "./MobileMenuAccordion";
import { MobileMenuFooter } from "./MobileMenuFooter";

export function MobileMenu() {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                render={
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Open navigation menu"
                        className="
                        h-11
                        w-11
                        rounded-xl
                        transition-all
                        duration-300
                        hover:bg-muted
                        active:scale-95
                    "
                    >
                        <Menu className="size-5" />
                    </Button>
                }
            />

            <SheetContent
                side="right"
                className="
                    flex
                    w-full
                    max-w-sm
                    flex-col
                    border-l
                    bg-background/95
                    p-0
                    backdrop-blur-xl
                "
            >
                <AnimatePresence mode="wait">
                    {open && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 24,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: 24,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="flex h-full flex-col"
                        >
                            <MobileMenuHeader />

                            <div className="flex-1 overflow-y-auto px-4 py-4">
                                <motion.div
                                    initial="hidden"
                                    animate="show"
                                    variants={{
                                        hidden: {},
                                        show: {
                                            transition: {
                                                staggerChildren: 0.05,
                                            },
                                        },
                                    }}
                                    className="space-y-2"
                                >
                                    {navigation.map((item) =>
                                        item.children ? (
                                            <MobileMenuAccordion
                                                key={item.title}
                                                item={item}
                                                onNavigate={() => setOpen(false)}
                                            />
                                        ) : (
                                            <MobileMenuItem
                                                key={item.href}
                                                item={item}
                                                onNavigate={() => setOpen(false)}
                                            />
                                        ),
                                    )}
                                </motion.div>
                            </div>

                            <div className="border-t p-4">
                                <Button
                                    size="lg"
                                    className="
                                        group
                                        h-12
                                        w-full
                                        rounded-xl
                                    "
                                >
                                    <Link
                                        href="/login"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        Login Admin
                                        <ArrowRight
                                            className="
                                                size-4
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />
                                    </Link>
                                </Button>
                            </div>

                            <MobileMenuFooter />
                        </motion.div>
                    )}
                </AnimatePresence>
            </SheetContent>
        </Sheet>
    );
}
