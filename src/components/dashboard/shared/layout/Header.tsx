"use client";

import { Menu } from "lucide-react";

import { Breadcrumb } from "./Breadcrumb";
import { UserDropdown } from "./UserDropdown";

interface HeaderProps {
    onMenuClick: () => void;
    userName?: string;
    role?: string;
}

export function Header({ onMenuClick, userName, role }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
            <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        aria-label="Open sidebar"
                        className="rounded-xl p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <Breadcrumb />
                </div>

                <UserDropdown name={userName} role={role} />
            </div>
        </header>
    );
}
