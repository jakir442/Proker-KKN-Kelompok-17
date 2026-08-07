"use client";

import { ChevronUp } from "lucide-react";

export function BackToTop() {
    return (
        <button
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
            className="
                fixed
                bottom-6
                right-6
                z-50
                flex
                size-12
                items-center
                justify-center
                rounded-full
                border
                bg-background
                shadow-lg
                transition-all
                hover:-translate-y-1
                hover:border-primary
                hover:text-primary
            "
        >
            <ChevronUp className="size-5" />
        </button>
    );
}
