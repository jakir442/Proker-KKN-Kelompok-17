import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

import { NavigationDropdown } from "./NavigationDropdown";

export function NavLinks() {
    const pathname = usePathname();

    return navigation.map((item) => {
        if (Array.isArray(item.children)) {
            return (
                <NavigationDropdown
                    key={item.title}
                    item={item as { title: string; children: { title: string; href: string }[] }}
                />
            );
        }

        const href = item.href;
        if (!href) {
            return null;
        }

        const active = pathname === href;

        return (
            <Link
                key={href}
                href={href}
                className={cn(
                    "group relative rounded-full px-3 py-2 text-[15px] font-medium transition-all duration-300",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
            >
                <span className="relative z-10">{item.title}</span>

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
            </Link>
        );
    });
}
