"use client";

import { useEffect, useState } from "react";

export function CurrentTime() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            setTime(
                new Date().toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            );
        };

        updateTime();

        const interval = setInterval(updateTime, 60_000);

        return () => clearInterval(interval);
    }, []);

    return <>{time}</>;
}
