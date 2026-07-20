"use client";

import { ReactNode } from "react";

import { FadeUp } from "./FadeUp";

interface RevealProps {
    children: ReactNode;
    className?: string;
}

export function Reveal({ children, className }: RevealProps) {
    return <FadeUp className={className}>{children}</FadeUp>;
}
