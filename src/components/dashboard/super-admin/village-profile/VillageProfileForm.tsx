"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { saveVillageProfile } from "@/actions/village-profile/village-profile";
import type { IVillageProfile } from "@/models/village-profile";
import { VillageHeadmanSection } from "./VillageHeadmanSection";
import { VillageInformationSection } from "./VillageInformationSection";
import { VillageVisionMissionSection } from "./VillageVisionMissionSection";
import { VillageStatisticSection } from "./VillageStatisticSection";

interface Props {
    initialData?: IVillageProfile | null;
}

export function VillageProfileForm({ initialData }: Props) {
    const [pending, startTransition] = useTransition();

    // Information
    const [about, setAbout] = useState(initialData?.about ?? "");
    const [history, setHistory] = useState(initialData?.history ?? "");

    // Vision
    const [vision, setVision] = useState(initialData?.vision ?? "");
    const [mission, setMission] = useState<string[]>(initialData?.mission ?? [""]);

    // Headman
    const [headmanName, setHeadmanName] = useState(initialData?.headmanName ?? "");

    const [headmanPhoto, setHeadmanPhoto] = useState(initialData?.headmanPhoto ?? "");

    const [headmanGreeting, setHeadmanGreeting] = useState(initialData?.headmanGreeting ?? "");

    // Statistics
    const [area, setArea] = useState(initialData?.area?.toString() ?? "");

    const [population, setPopulation] = useState(initialData?.population?.toString() ?? "");

    const [households, setHouseholds] = useState(initialData?.households?.toString() ?? "");

    const [rt, setRt] = useState(initialData?.rt?.toString() ?? "");

    const [rw, setRw] = useState(initialData?.rw?.toString() ?? "");

    const [hamlets, setHamlets] = useState(initialData?.hamlets?.toString() ?? "");

    const [latitude, setLatitude] = useState(initialData?.latitude?.toString() ?? "");

    const [longitude, setLongitude] = useState(initialData?.longitude?.toString() ?? "");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        startTransition(async () => {
            const result = await saveVillageProfile({
                about,
                history,
                vision,
                mission: mission.filter((item) => item.trim() !== ""),
                headmanName,
                headmanPhoto,
                headmanGreeting,
                area: Number(area),
                population: Number(population),
                households: Number(households),
                rt: Number(rt),
                rw: Number(rw),
                hamlets: Number(hamlets),
                latitude: Number(latitude),
                longitude: Number(longitude),
            });

            if (!result.success) {
                alert(result.message);
                return;
            }

            alert(result.message);
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <VillageInformationSection
                about={about}
                history={history}
                setAbout={setAbout}
                setHistory={setHistory}
            />

            <VillageVisionMissionSection
                vision={vision}
                mission={mission}
                setVision={setVision}
                setMission={setMission}
            />

            <VillageHeadmanSection
                headmanName={headmanName}
                headmanPhoto={headmanPhoto}
                headmanGreeting={headmanGreeting}
                setHeadmanName={setHeadmanName}
                setHeadmanPhoto={setHeadmanPhoto}
                setHeadmanGreeting={setHeadmanGreeting}
            />

            <VillageStatisticSection
                area={area}
                population={population}
                households={households}
                rt={rt}
                rw={rw}
                hamlets={hamlets}
                latitude={latitude}
                longitude={longitude}
                setArea={setArea}
                setPopulation={setPopulation}
                setHouseholds={setHouseholds}
                setRt={setRt}
                setRw={setRw}
                setHamlets={setHamlets}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
            />

            <Button type="submit" disabled={pending} className="w-full">
                {pending ? "Menyimpan..." : "Simpan Profil Desa"}
            </Button>
        </form>
    );
}
