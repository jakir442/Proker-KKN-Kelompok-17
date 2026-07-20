import {
    Building2,
    CalendarDays,
    FileText,
    GalleryHorizontal,
    Home,
    Landmark,
    LayoutGrid,
    Megaphone,
    MessageSquare,
    Newspaper,
    Phone,
    Store,
    Trees,
    type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
    title: string;
    description?: string;
    href?: string;
    icon: LucideIcon;
    badge?: string;
    external?: boolean;
    disabled?: boolean;
    children?: NavigationItem[];
}

export const navigation: NavigationItem[] = [
    {
        title: "Home",
        description: "Beranda dan informasi utama desa",
        href: "/",
        icon: Home,
    },
    {
        title: "Profil",
        description: "Sejarah, visi misi, dan profil desa",
        href: "/profil",
        icon: Building2,
    },
    {
        title: "Berita",
        description: "Informasi dan berita terbaru desa",
        href: "/berita",
        icon: Newspaper,
    },
    {
        title: "UMKM",
        description: "Produk unggulan dan pelaku usaha lokal",
        href: "/umkm",
        icon: Store,
    },
    {
        title: "Wisata",
        description: "Destinasi wisata dan potensi desa",
        href: "/wisata",
        icon: Trees,
    },
    {
        title: "Transparansi",
        description: "Laporan APBDes dan transparansi anggaran",
        href: "/transparansi",
        icon: Landmark,
    },
    {
        title: "Layanan",
        description: "Pelayanan administrasi dan informasi publik",
        icon: LayoutGrid,
        children: [
            {
                title: "Layanan Desa",
                description: "Pengajuan surat dan administrasi desa",
                href: "/layanan",
                icon: FileText,
            },
            {
                title: "Aspirasi",
                description: "Sampaikan kritik, saran, dan pengaduan",
                href: "/aspirasi",
                icon: MessageSquare,
            },
            {
                title: "Agenda",
                description: "Jadwal kegiatan dan acara desa",
                href: "/agenda",
                icon: CalendarDays,
            },
            {
                title: "Pengumuman",
                description: "Informasi resmi dari pemerintah desa",
                href: "/pengumuman",
                icon: Megaphone,
            },
        ],
    },
    {
        title: "Tentang",
        description: "Informasi mengenai pemerintah desa",
        icon: Building2,
        children: [
            {
                title: "Pemerintahan",
                description: "Struktur organisasi dan perangkat desa",
                href: "/pemerintahan",
                icon: Building2,
            },
            {
                title: "Galeri",
                description: "Dokumentasi foto dan kegiatan desa",
                href: "/galeri",
                icon: GalleryHorizontal,
            },
            {
                title: "Kontak",
                description: "Alamat, lokasi, dan informasi kontak",
                href: "/kontak",
                icon: Phone,
            },
        ],
    },
];
