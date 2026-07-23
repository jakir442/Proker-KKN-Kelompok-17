interface Props {
    latitude: number;
    longitude: number;
    title: string;
    zoom?: number;
}

export function MapEmbed({ latitude, longitude, title, zoom = 16 }: Props) {
    const src = `https://www.google.com/maps?q=${latitude},${longitude}&z=${zoom}&output=embed`;

    return (
        <iframe
            src={src}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[520px] w-full border-0"
        />
    );
}
