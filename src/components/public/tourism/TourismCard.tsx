import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TourismCardProps {
    name: string;
    image: string;
    location: string;
    description: string;
}

export function TourismCard({ name, image, location, description }: TourismCardProps) {
    return (
        <article className="group overflow-hidden rounded-2xl border bg-white transition hover:-translate-y-2 hover:shadow-xl">
            <div className="relative h-64 overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                    Wisata
                </span>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold">{name}</h3>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    {location}
                </div>

                <p className="mt-4 line-clamp-3 text-slate-600">{description}</p>

                <Button variant="link" className="mt-4 p-0 text-emerald-600">
                    <Link href="#">
                        Lihat Detail
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
        </article>
    );
}
