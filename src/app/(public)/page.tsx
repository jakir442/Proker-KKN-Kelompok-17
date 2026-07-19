import { LatestAnnouncements } from "@/components/public/announcements/LatestAnnouncements";
import { UpcomingEvents } from "@/components/public/events/UpcomingEvents";
import { Gallery } from "@/components/public/gallery/Gallery";
import { About } from "@/components/public/home/About";
import { CTA } from "@/components/public/home/CTA";
import { LatestNews } from "@/components/public/news/LatestNews";
import { Tourism } from "@/components/public/tourism/Tourism";
import { FeaturedUMKM } from "@/components/public/umkm/FeaturedUMKM";
import { APBDesOverview } from "@/components/public/apbdes/APBDesOverview";
import { Hero } from "@/components/public/home/hero/Hero";
import { getHeroStatistics } from "@/repositories/hero.repository";

export default async function HomePage() {
    const heroStats = await getHeroStatistics();

    return (
        <>
            <Hero stats={heroStats} />
            <About />
            <LatestAnnouncements />
            <UpcomingEvents />
            <LatestNews />
            <FeaturedUMKM />
            <Tourism />
            <APBDesOverview />
            <Gallery />
            <CTA />
        </>
    );
}
