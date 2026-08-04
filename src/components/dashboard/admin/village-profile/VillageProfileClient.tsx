"use client";

import { useMemo, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { FieldErrors } from "react-hook-form";

import type { IVillageProfile } from "@/models/village-profile";

import {
    villageProfileSchema,
    type VillageProfileValues,
} from "@/validations/village-profile.schema";
import { VILLAGE_PROFILE_SECTIONS } from "@/config/village-profile";
import type { VillageProfileSection } from "@/types/village-profile";
import { TopNavigation } from "./TopNavigation";
import { updateVillageProfileAction } from "@/actions/village-profile/update-village-profile";

interface Props {
    profile: IVillageProfile | null;
}

export function VillageProfileClient({ profile }: Props) {
    const [activeSection, setActiveSection] = useState<VillageProfileSection>("basic");
    const [loading, startTransition] = useTransition();
    const SECTION_NAME: Record<VillageProfileSection, string> = {
        basic: "Informasi Dasar",
        about: "Tentang Desa",
        vision: "Visi & Misi",
        headman: "Kepala Desa",
        statistics: "Statistik Desa",
        location: "Lokasi Desa",
    };
    const form = useForm<VillageProfileValues>({
        resolver: zodResolver(villageProfileSchema),
        defaultValues: {
            villageName: profile?.villageName ?? "",
            address: profile?.address ?? "",
            district: profile?.district ?? "",
            regency: profile?.regency ?? "",
            province: profile?.province ?? "",
            postalCode: profile?.postalCode ?? "",
            email: profile?.email ?? "",
            phone: profile?.phone ?? "",
            website: profile?.website ?? "",
            officeHours: profile?.officeHours ?? "",

            logo: undefined,
            officePhoto: undefined,
            logoUrl: profile?.logo ?? "",
            officePhotoUrl: profile?.officePhoto ?? "",

            about: profile?.about ?? "",
            history: profile?.history ?? "",
            vision: profile?.vision ?? "",

            mission: profile?.mission?.length
                ? profile.mission.map((item) => ({
                      value: item,
                  }))
                : [
                      {
                          value: "",
                      },
                  ],

            headman: {
                name: profile?.headman?.name ?? "",
                position: profile?.headman?.position ?? "Kepala Desa",
                greeting: profile?.headman?.greeting ?? "",
                photo: profile?.headman?.photo ?? "",
            },

            statistics: {
                area: profile?.statistics?.area ?? 0,
                population: profile?.statistics?.population ?? 0,
                households: profile?.statistics?.households ?? 0,
                rt: profile?.statistics?.rt ?? 0,
                rw: profile?.statistics?.rw ?? 0,
                hamlets: profile?.statistics?.hamlets ?? 0,
            },

            location: {
                latitude: profile?.location?.latitude ?? -7.218,
                longitude: profile?.location?.longitude ?? 107.903,
                googleMaps: profile?.location?.googleMaps ?? "",
            },
        },
    });

    const section = useMemo(
        () => VILLAGE_PROFILE_SECTIONS.find((item) => item.id === activeSection),
        [activeSection],
    );

    if (!section) {
        return null;
    }

    const ActiveSection = section.component;

    const SECTION_FIELDS: Record<VillageProfileSection, (keyof VillageProfileValues)[]> = {
        basic: [
            "villageName",
            "address",
            "district",
            "regency",
            "province",
            "postalCode",
            "email",
            "phone",
            "website",
            "officeHours",
            "logo",
            "officePhoto",
            "logoUrl",
            "officePhotoUrl",
        ],
        about: ["about", "history"],
        vision: ["vision", "mission"],
        headman: ["headman"],
        statistics: ["statistics"],
        location: ["location"],
    };

    function getErrorSection(errors: FieldErrors<VillageProfileValues>): VillageProfileSection {
        for (const [section, fields] of Object.entries(SECTION_FIELDS) as [
            VillageProfileSection,
            (keyof VillageProfileValues)[],
        ][]) {
            if (fields.some((field) => errors[field])) {
                return section;
            }
        }

        return "basic";
    }

    function focusFirstError(section: VillageProfileSection) {
        switch (section) {
            case "basic":
                form.setFocus("villageName");
                break;

            case "about":
                form.setFocus("about");
                break;

            case "vision":
                form.setFocus("vision");
                break;

            case "headman":
                form.setFocus("headman.name");
                break;

            case "statistics":
                form.setFocus("statistics.area");
                break;

            case "location":
                form.setFocus("location.latitude");
                break;
        }
    }

    async function onSubmit(values: VillageProfileValues) {
        console.log("SUBMIT");
        console.log(values);

        startTransition(async () => {
            const result = await updateVillageProfileAction(values);

            console.log(result);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
            form.reset(values);
        });
    }

    return (
        <form
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
                const section = getErrorSection(errors);

                setActiveSection(section);
                focusFirstError(section);

                toast.error("Data belum lengkap", {
                    description: `Silakan lengkapi bagian "${SECTION_NAME[section]}".`,
                });
            })}
        >
            <TopNavigation value={activeSection} onChange={setActiveSection} />

            <Card className="overflow-hidden rounded-3xl border shadow-sm">
                <div className="p-5 sm:p-6 lg:p-8">
                    <ActiveSection form={form} loading={loading} />
                </div>
            </Card>

            <div className="sticky bottom-4 z-30 flex justify-end">
                <Card className="flex w-full max-w-md items-center justify-between rounded-2xl border p-4 shadow-xl backdrop-blur">
                    <div>
                        <p className="text-sm font-semibold">Simpan Perubahan</p>

                        <p className="text-xs text-muted-foreground">
                            Semua perubahan profil desa akan disimpan.
                        </p>
                    </div>

                    <Button type="submit" disabled={loading || !form.formState.isDirty}>
                        <Save className="mr-2 h-4 w-4" />

                        {loading ? "Menyimpan..." : "Simpan"}
                    </Button>
                </Card>
            </div>
        </form>
    );
}
