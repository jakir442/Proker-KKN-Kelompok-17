import dynamic from "next/dynamic";

export interface InteractiveMapProps {
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    zoom?: number;
    className?: string;
}

export const InteractiveMap = dynamic(
    () => import("./InteractiveMapClient").then((mod) => mod.InteractiveMapClient),
    {
        ssr: false,
        loading: () => <div className="h-[520px] w-full animate-pulse rounded-3xl bg-muted" />,
    },
);
