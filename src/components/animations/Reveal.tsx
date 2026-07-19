"use client";

import { FadeUp } from "./FadeUp";

export function Reveal({ children }: { children: React.ReactNode }) {
    return <FadeUp>{children}</FadeUp>;
}
