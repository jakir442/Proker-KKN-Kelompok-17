"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

import { Container } from "../layout/Container";
import { Logo } from "../common/Logo";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./mobile/MobileMenu";

export function Navbar() {
    const scrolled = useScroll();

    return (
        <header
            className={cn(
                "sticky top-0 z-50 transition-all duration-300 ease-out",
                scrolled
                    ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm"
                    : "bg-background/95",
            )}
        >
            <Container>
                <div
                    className={cn(
                        "flex items-center justify-between transition-all duration-300",
                        scrolled ? "h-[68px]" : "h-[76px]",
                    )}
                >
                    <div className="transition-transform duration-300 hover:scale-[1.02]">
                        <Logo />
                    </div>

                    <nav
                        aria-label="Main Navigation"
                        className="hidden items-center gap-4 xl:gap-5 lg:flex"
                    >
                        <NavLinks />
                    </nav>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Button
                            size="lg"
                            className="group rounded-full px-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
                        >
                            <Link href="/login" className="flex items-center gap-2">
                                <span>Login</span>
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>

                    <div className="lg:hidden">
                        <MobileMenu />
                    </div>
                </div>
            </Container>
        </header>
    );
}
