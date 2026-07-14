import { getPublishedGalleryAction } from "@/actions/gallery/get-published-gallery";
import { GallerySection } from "./GallerySection";

export async function Gallery() {
    const result = await getPublishedGalleryAction();

    return <GallerySection data={result.success ? result.data : []} />;
}
