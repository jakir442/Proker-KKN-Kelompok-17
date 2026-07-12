import {
    LayoutDashboard,
    Newspaper,
    Store,
    Mountain,
    Images,
    Users,
    Wallet,
    Settings,
    LucideIcon,
} from "lucide-react";

export interface NavItem {
    title: string;
    url: string;
    icon: LucideIcon;
}

export interface NavGroup {
    label: string;
    items: NavItem[];
}

export const sidebarGroups: NavGroup[] = [
    {
        label: "GENERAL",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: LayoutDashboard,
            },
        ],
    },

    {
        label: "CONTENT",
        items: [
            {
                title: "Berita",
                url: "/dashboard/content/news",
                icon: Newspaper,
            },
            {
                title: "UMKM",
                url: "/dashboard/content/umkm",
                icon: Store,
            },
            {
                title: "Wisata",
                url: "/dashboard/content/tourism",
                icon: Mountain,
            },
            {
                title: "Galeri",
                url: "/dashboard/content/gallery",
                icon: Images,
            },
        ],
    },

    {
        label: "MANAGEMENT",
        items: [
            {
                title: "Users",
                url: "/dashboard/users",
                icon: Users,
            },
            {
                title: "Keuangan",
                url: "/dashboard/finance",
                icon: Wallet,
            },
        ],
    },

    {
        label: "SYSTEM",
        items: [
            {
                title: "Settings",
                url: "/dashboard/settings",
                icon: Settings,
            },
        ],
    },
];
