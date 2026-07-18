import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all news
export async function GET() {
    const news = await prisma.news.findMany({
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(news);
}

// CREATE news
export async function POST(req: Request) {
    const body = await req.json();

    const news = await prisma.news.create({
        data: {
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt,
            content: body.content,
            image: body.image,
            category: body.category,
            published: body.published ?? false,
        },
    });

    return NextResponse.json(news);
}
