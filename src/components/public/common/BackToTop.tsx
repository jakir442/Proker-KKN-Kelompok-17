"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const scroll = () => {
            setShow(window.scrollY > 500);
        };

        window.addEventListener("scroll", scroll);

        return () => window.removeEventListener("scroll", scroll);
    }, []);

    if (!show) return null;

    return (
        <Button
            size="icon"
            className="fixed bottom-6 right-6 z-50 rounded-full shadow-xl"
            onClick={() =>
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            }
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    );
}
