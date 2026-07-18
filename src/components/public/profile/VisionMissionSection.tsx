import { CheckCircle2 } from "lucide-react";

interface Props {
    vision: string;
    mission: string[];
}

export function VisionMissionSection({ vision, mission }: Props) {
    return (
        <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border bg-card p-8">
                <h2 className="text-2xl font-bold">Visi Desa</h2>

                <p className="mt-6 leading-8">{vision}</p>
            </div>

            <div className="rounded-2xl border bg-card p-8">
                <h2 className="text-2xl font-bold">Misi Desa</h2>

                <div className="mt-6 space-y-4">
                    {mission.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1 h-5 w-5 text-primary shrink-0" />

                            <p className="leading-7">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
