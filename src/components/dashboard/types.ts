import { LucideIcon } from "lucide-react";

import type { UserRole } from "@/constants/roles";

/**
 * Dashboard Role
 */
export type DashboardRole = UserRole;

/**
 * Available color variants
 */
export type DashboardColor = "emerald" | "blue" | "amber" | "rose" | "violet";

/**
 * Statistic Card
 */

export interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;

    /**
     * Optional
     */
    trend?: string;
    trendLabel?: string;

    /**
     * Warna aksen card
     */
    color?: "emerald" | "blue" | "amber" | "rose" | "violet";

    /**
     * Klik card menuju halaman tertentu
     */
    href?: string;
}

/**
 * Quick Action
 */
export interface QuickActionItem {
    title: string;
    description: string;
    href: string;
    icon: LucideIcon;
    color: DashboardColor;
    roles: DashboardRole[];
}

/**
 * Welcome Banner
 */
export interface WelcomeBannerProps {
    name: string;
    role: DashboardRole;
}

/**
 * Dashboard Summary Item
 */
export interface SummaryItem {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color?: DashboardColor;
}

/**
 * Recent Activity
 */
export interface ActivityItem {
    id: string;
    title: string;
    description: string;
    createdAt: Date | string;
    icon?: LucideIcon;
    href?: string;
}
