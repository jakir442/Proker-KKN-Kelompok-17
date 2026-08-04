"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { VILLAGE_PROFILE_SECTIONS } from "./village-profile.sections";
import type { VillageProfileSection } from "@/types/village-profile";

interface Props {
    value: VillageProfileSection;
    onChange: (value: VillageProfileSection) => void;
}

export function TopNavigation({ value, onChange }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);

    const startX = useRef(0);
    const scrollLeft = useRef(0);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        function handleWheel(e: WheelEvent) {
            if (!container || container.scrollWidth <= container.clientWidth) {
                return;
            }

            e.preventDefault();

            container.scrollLeft += e.deltaY;
        }

        container.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, []);

    function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
        const container = containerRef.current;

        if (!container) return;

        setIsDragging(true);

        startX.current = e.pageX - container.offsetLeft;
        scrollLeft.current = container.scrollLeft;
    }

    function handleMouseLeave() {
        setIsDragging(false);
    }

    function handleMouseUp() {
        setIsDragging(false);
    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const container = containerRef.current;

        if (!container || !isDragging) return;

        e.preventDefault();

        const x = e.pageX - container.offsetLeft;

        const walk = (x - startX.current) * 1.5;

        container.scrollLeft = scrollLeft.current - walk;
    }

    return (
        <div className="w-full overflow-hidden">
            <div
                ref={containerRef}
                onWheel={(e) => {
                    const container = containerRef.current;

                    if (!container) return;

                    if (container.scrollWidth > container.clientWidth) {
                        e.preventDefault();

                        container.scrollLeft += e.deltaY;
                    }
                }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={cn(
                    "flex gap-2 overflow-x-auto rounded-2xl border bg-card p-2 scrollbar-thin select-none",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                )}
            >
                {VILLAGE_PROFILE_SECTIONS.map((section) => {
                    const Icon = section.icon;

                    const active = value === section.id;

                    return (
                        <button
                            key={section.id}
                            type="button"
                            onClick={() => onChange(section.id)}
                            className={cn(
                                "flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                                active
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            )}
                        >
                            <Icon className="h-4 w-4" />

                            <span>{section.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
