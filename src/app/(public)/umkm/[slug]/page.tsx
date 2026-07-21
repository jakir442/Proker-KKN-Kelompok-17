import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRelatedUMKMAction } from "@/actions/public/get-related-umkm";
import { getUMKMBySlugAction } from "@/actions/public/get-umkm-by-slug";
import { BlurBlob, FadeIn, FadeUp, Floating, Reveal } from "@/components/animations";
import { UMKMHero } from "@/components/public/umkm/detail/UMKMHero";
import { UMKMInformation } from "@/components/public/umkm/detail/UMKMInformation";
import { UMKMDescription } from "@/components/public/umkm/detail/UMKMDescription";
import { UMKMGallery } from "@/components/public/umkm/detail/UMKMGallery";
import { UMKMMap } from "@/components/public/umkm/detail/UMKMMap";
import { RelatedUMKM } from "@/components/public/umkm/detail/RelatedUMKM";
import { UMKMReviewSection } from "@/components/public/umkm/detail/UMKMReviewSection";
import { getUMKMReviewsAction } from "@/actions/public/get-umkm-reviews";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    const result = await getUMKMBySlugAction(slug);

    if (!result.success || !result.data) {
        return {
            title: "UMKM",
        };
    }

    const item = result.data;

    return {
        title: `${item.name} | UMKM Desa Cintanagara`,
        description: item.description,
        openGraph: {
            title: item.name,
            description: item.description,
            images: item.image ? [item.image] : [],
        },
    };
}

export default async function UMKMDetailPage({ params }: Props) {
    const { slug } = await params;
    const result = await getUMKMBySlugAction(slug);

    if (!result.success || !result.data) {
        notFound();
    }

    const item = result.data;
    const related = await getRelatedUMKMAction(item.category, item.slug);
    const reviewsResult = await getUMKMReviewsAction(item._id);
    const reviews = reviewsResult.success ? reviewsResult.data : [];

    return (
        <main className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
            {/* Background Decoration */}
            <BlurBlob className="left-0 top-20" />

            <BlurBlob className="right-0 top-[40rem]" />

            <Floating>
                <div className="absolute right-20 top-40 hidden h-32 w-32 rounded-full bg-emerald-200/20 blur-3xl lg:block" />
            </Floating>

            {/* Hero */}
            <FadeIn>
                <UMKMHero item={item} />
            </FadeIn>

            {/* Information */}
            <Reveal>
                <UMKMInformation item={item} />
            </Reveal>

            {/* Description */}
            <FadeUp delay={0.1}>
                <UMKMDescription item={item} />
            </FadeUp>

            {/* Gallery */}
            <Reveal>
                <UMKMGallery images={item.gallery} />
            </Reveal>

            {/* Map */}
            <Reveal>
                <UMKMMap item={item} />
            </Reveal>

            {/* Related */}
            <Reveal>
                <RelatedUMKM items={related.success ? related.data : []} />
            </Reveal>

            {/* Retting */}
            <Reveal>
                <UMKMReviewSection umkmId={item._id} reviews={reviews} />
            </Reveal>
        </main>
    );
}
