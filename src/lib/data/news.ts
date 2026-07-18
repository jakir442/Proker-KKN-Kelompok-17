import { News } from "@/types/news";

export const latestNews: News[] = [
    {
        id: "1",
        title: "Musyawarah Desa Tahun 2026",
        slug: "musyawarah-desa-2026",
        image: "/images/hero-desa.jpg",
        excerpt:
            "Pemerintah Desa Cintanagara mengadakan musyawarah desa untuk membahas pembangunan tahun 2026.",
        date: "10 Juli 2026",
        category: "Pemerintahan",
    },
    {
        id: "2",
        title: "Pelatihan UMKM Digital",
        slug: "pelatihan-umkm",
        image: "/images/about-desa.jpg",
        excerpt: "Pelatihan pemasaran digital bagi pelaku UMKM desa.",
        date: "5 Juli 2026",
        category: "UMKM",
    },
    {
        id: "3",
        title: "Gotong Royong Bersama",
        slug: "gotong-royong",
        image: "/images/hero-desa.jpg",
        excerpt: "Kegiatan gotong royong bersama seluruh masyarakat desa.",
        date: "1 Juli 2026",
        category: "Sosial",
    },
];
