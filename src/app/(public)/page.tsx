import { LatestAnnouncements } from "@/components/public/announcements/LatestAnnouncements";
import { UpcomingEvents } from "@/components/public/events/UpcomingEvents";
import { Gallery } from "@/components/public/gallery/Gallery";
import { About } from "@/components/public/home/About";
import { CTA } from "@/components/public/home/CTA";
import { Hero } from "@/components/public/home/Hero";
import { LatestNews } from "@/components/public/news/LatestNews";
import { Tourism } from "@/components/public/tourism/Tourism";
import { FeaturedUMKM } from "@/components/public/umkm/FeaturedUMKM";
import { APBDesOverview } from "@/components/public/apbdes/APBDesOverview";

export default function HomePage() {
    return (
        <>
            <Hero />
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
