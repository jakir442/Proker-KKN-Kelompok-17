import type { ComponentType } from "react";

import type { LucideIcon } from "lucide-react";
import { Building2, FileText, MapPinned, Target, UserRound, Users } from "lucide-react";

import type { VillageProfileSectionProps } from "./section-props";

import { VillageProfileSection } from "@/types/village-profile";
import { BasicInformationSection } from "./sections/BasicInformationSection";
import { AboutSection } from "./sections/AboutSection";
import { VisionMissionSection } from "./sections/VisionMissionSection";
import { HeadmanSection } from "./sections/HeadmanSection";
import { StatisticsSection } from "./sections/StatisticsSection";
import { LocationSection } from "./sections/LocationSection";

export interface VillageProfileSectionItem {
    id: VillageProfileSection;
    label: string;
    description: string;
    icon: LucideIcon;
    component: ComponentType<VillageProfileSectionProps>;
}

export const VILLAGE_PROFILE_SECTIONS = [
    {
        id: "basic",
        label: "Informasi Dasar",
        description: "Kelola identitas, kontak, dan informasi umum desa.",
        icon: Building2,
        component: BasicInformationSection,
    },
    {
        id: "about",
        label: "Tentang Desa",
        description: "Kelola profil singkat dan sejarah desa.",
        icon: FileText,
        component: AboutSection,
    },
    {
        id: "vision",
        label: "Visi & Misi",
        description: "Kelola visi dan misi pembangunan desa.",
        icon: Target,
        component: VisionMissionSection,
    },
    {
        id: "headman",
        label: "Kepala Desa",
        description: "Kelola informasi kepala desa dan sambutan resmi.",
        icon: UserRound,
        component: HeadmanSection,
    },
    {
        id: "statistics",
        label: "Statistik Desa",
        description: "Kelola statistik wilayah dan kependudukan.",
        icon: Users,
        component: StatisticsSection,
    },
    {
        id: "location",
        label: "Lokasi Desa",
        description: "Kelola koordinat, peta, dan lokasi kantor desa.",
        icon: MapPinned,
        component: LocationSection,
    },
] as const satisfies readonly VillageProfileSectionItem[];

export function getVillageProfileSection(
    id: VillageProfileSection,
): VillageProfileSectionItem | undefined {
    return VILLAGE_PROFILE_SECTIONS.find((section) => section.id === id);
}
