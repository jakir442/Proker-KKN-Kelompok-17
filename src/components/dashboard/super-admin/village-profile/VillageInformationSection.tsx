"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
    about: string;
    history: string;

    setAbout: (value: string) => void;
    setHistory: (value: string) => void;
}

export function VillageInformationSection({ about, history, setAbout, setHistory }: Props) {
    return (
        <div className="space-y-5 rounded-lg border p-5">
            <div>
                <h2 className="text-lg font-semibold">Informasi Desa</h2>

                <p className="text-sm text-muted-foreground">
                    Informasi umum mengenai Desa Cintanagara.
                </p>
            </div>

            <div className="space-y-2">
                <Label>Tentang Desa</Label>

                <Textarea
                    rows={5}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Tuliskan deskripsi singkat mengenai desa..."
                />
            </div>

            <div className="space-y-2">
                <Label>Sejarah Desa</Label>

                <Textarea
                    rows={6}
                    value={history}
                    onChange={(e) => setHistory(e.target.value)}
                    placeholder="Tuliskan sejarah singkat desa..."
                />
            </div>
        </div>
    );
}
