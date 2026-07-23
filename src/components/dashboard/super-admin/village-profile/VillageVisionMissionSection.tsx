"use client";

import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    vision: string;
    mission: string[];

    setVision: (value: string) => void;
    setMission: (value: string[]) => void;
}

export function VillageVisionMissionSection({ vision, mission, setVision, setMission }: Props) {
    function addMission() {
        setMission([...mission, ""]);
    }

    function updateMission(index: number, value: string) {
        const updated = [...mission];

        updated[index] = value;

        setMission(updated);
    }

    function removeMission(index: number) {
        setMission(mission.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-5 rounded-lg border p-5">
            <div>
                <h2 className="text-lg font-semibold">Visi & Misi</h2>

                <p className="text-sm text-muted-foreground">Visi dan misi pembangunan desa.</p>
            </div>

            <div className="space-y-2">
                <Label>Visi</Label>

                <Input
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    placeholder="Masukkan visi desa..."
                />
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label>Misi</Label>

                    <Button type="button" variant="outline" size="sm" onClick={addMission}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah
                    </Button>
                </div>

                {mission.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            value={item}
                            onChange={(e) => updateMission(index, e.target.value)}
                            placeholder={`Misi ${index + 1}`}
                        />

                        <Button
                            type="button"
                            size="icon"
                            variant="destructive"
                            onClick={() => removeMission(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
