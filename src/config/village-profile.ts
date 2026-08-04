import type { ComponentType } from "react";

import { Building2, FileText, MapPinned, Target, User, Users } from "lucide-react";

import type { VillageProfileSection } from "@/types/village-profile";

import type { VillageProfileSectionProps } from "@/components/dashboard/admin/village-profile/section-props";

import { AboutSection } from "@/components/dashboard/admin/village-profile/sections/AboutSection";
import { BasicInformationSection } from "@/components/dashboard/admin/village-profile/sections/BasicInformationSection";
import { HeadmanSection } from "@/components/dashboard/admin/village-profile/sections/HeadmanSection";
import { LocationSection } from "@/components/dashboard/admin/village-profile/sections/LocationSection";
import { StatisticsSection } from "@/components/dashboard/admin/village-profile/sections/StatisticsSection";
import { VisionMissionSection } from "@/components/dashboard/admin/village-profile/sections/VisionMissionSection";

export interface VillageProfileSectionItem {
    id: VillageProfileSection;
    label: string;
    icon: ComponentType<{ className?: string }>;
    component: ComponentType<VillageProfileSectionProps>;
}

export const VILLAGE_PROFILE_SECTIONS: VillageProfileSectionItem[] = [
    {
        id: "basic",
        label: "Informasi Dasar",
        icon: Building2,
        component: BasicInformationSection,
    },
    {
        id: "about",
        label: "Tentang Desa",
        icon: FileText,
        component: AboutSection,
    },
    {
        id: "vision",
        label: "Visi & Misi",
        icon: Target,
        component: VisionMissionSection,
    },
    {
        id: "headman",
        label: "Kepala Desa",
        icon: User,
        component: HeadmanSection,
    },
    {
        id: "statistics",
        label: "Statistik",
        icon: Users,
        component: StatisticsSection,
    },
    {
        id: "location",
        label: "Lokasi",
        icon: MapPinned,
        component: LocationSection,
    },
];
