import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const news = await prisma.news.findUnique({
        where: { id: params.id },
    });

    return NextResponse.json(news);
}

// DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    await prisma.news.delete({
        where: { id: params.id },
    });

    return NextResponse.json({ message: "Deleted" });
}

// UPDATE
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();

    const news = await prisma.news.update({
        where: { id: params.id },
        data: body,
    });

    return NextResponse.json(news);
}
