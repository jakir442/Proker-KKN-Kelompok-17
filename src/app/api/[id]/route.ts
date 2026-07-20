import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET
export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const news = await prisma.news.findUnique({
        where: { id },
    });

    return NextResponse.json(news);
}

// DELETE
export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;

    await prisma.news.delete({
        where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
}

// PATCH
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();

    const news = await prisma.news.update({
        where: { id },
        data: body,
    });

    return NextResponse.json(news);
}
