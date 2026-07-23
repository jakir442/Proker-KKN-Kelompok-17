"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    area: string;
    population: string;
    households: string;
    rt: string;
    rw: string;
    hamlets: string;
    latitude: string;
    longitude: string;

    setArea: (value: string) => void;
    setPopulation: (value: string) => void;
    setHouseholds: (value: string) => void;
    setRt: (value: string) => void;
    setRw: (value: string) => void;
    setHamlets: (value: string) => void;
    setLatitude: (value: string) => void;
    setLongitude: (value: string) => void;
}

export function VillageStatisticSection({
    area,
    population,
    households,
    rt,
    rw,
    hamlets,
    latitude,
    longitude,
    setArea,
    setPopulation,
    setHouseholds,
    setRt,
    setRw,
    setHamlets,
    setLatitude,
    setLongitude,
}: Props) {
    return (
        <div className="space-y-5 rounded-lg border p-5">
            <div>
                <h2 className="text-lg font-semibold">Statistik Desa</h2>

                <p className="text-sm text-muted-foreground">Data statistik dan koordinat desa.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Luas Wilayah (Ha)</Label>

                    <Input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>Jumlah Penduduk</Label>

                    <Input
                        type="number"
                        value={population}
                        onChange={(e) => setPopulation(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Jumlah KK</Label>

                    <Input
                        type="number"
                        value={households}
                        onChange={(e) => setHouseholds(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Jumlah RT</Label>

                    <Input type="number" value={rt} onChange={(e) => setRt(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>Jumlah RW</Label>

                    <Input type="number" value={rw} onChange={(e) => setRw(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>Jumlah Dusun</Label>

                    <Input
                        type="number"
                        value={hamlets}
                        onChange={(e) => setHamlets(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Latitude</Label>

                    <Input
                        type="number"
                        step="any"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Longitude</Label>

                    <Input
                        type="number"
                        step="any"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
