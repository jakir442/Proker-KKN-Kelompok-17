"use client";

import Link, { LinkProps } from "next/link";
import { MouseEvent, ReactNode } from "react";

interface Props extends LinkProps {
    children: ReactNode;
    className?: string;
}

export function ScrollToTopLink({ children, className, ...props }: Props) {
    const handleClick = () => {
        requestAnimationFrame(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    };

    return (
        <Link {...props} scroll onClick={handleClick} className={className}>
            {children}
        </Link>
    );
}
