"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "../layout/Container";
import { Logo } from "../common/Logo";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

export function Navbar() {
    const scrolled = useScroll();
    return (
        <header
            className={cn(
                "sticky top-0 z-50 border-b transition-all duration-300",
                scrolled
                    ? "bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80"
                    : "bg-white/95",
            )}
        >
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Logo />

                    <nav className="hidden items-center gap-8 md:flex">
                        <NavLinks />
                    </nav>

                    <div className="hidden md:block">
                        <Button>
                            <Link href="/login">Login Admin</Link>
                        </Button>
                    </div>

                    <div className="md:hidden">
                        <MobileMenu />
                    </div>
                </div>
            </Container>
        </header>
    );
}
