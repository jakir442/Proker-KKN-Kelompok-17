import { OfficialCard } from "./OfficialCard";

interface OfficialItem {
    id: string;
    name: string;
    position: string;
    photo?: string;
    phone?: string;
    email?: string;
}

interface Props {
    officials: OfficialItem[];
}

export function OfficialGrid({ officials }: Props) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {officials.map((official) => (
                <OfficialCard
                    key={official.id}
                    name={official.name}
                    position={official.position}
                    photo={official.photo}
                    phone={official.phone}
                    email={official.email}
                />
            ))}
        </div>
    );
}
