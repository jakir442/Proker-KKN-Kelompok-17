"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { NavGroup } from "./data";

interface Props {
    groups: NavGroup[];
}

export function NavMain({ groups }: Props) {
    const pathname = usePathname();

    return (
        <div className="space-y-8">
            {groups.map((group) => (
                <div key={group.label}>
                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {group.label}
                    </p>

                    <div className="space-y-1">
                        {group.items.map((item) => {
                            const Icon = item.icon;

                            const active =
                                pathname === item.url || pathname.startsWith(item.url + "/");

                            return (
                                <Link
                                    key={item.url}
                                    href={item.url}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                        active
                                            ? "bg-primary text-primary-foreground shadow"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                    )}
                                >
                                    <Icon className="h-4 w-4" />

                                    {item.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
