import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    _req: NextRequest,
    { params }: { params: { courseId: string; } }
) => {
    try {
        const data = await db.course.findUnique({
            where: {
                id: params?.courseId,
            },
            include: {
                demoMetadata: true,
                benefits: true,
                prerequisites: true,
                reviews: true,
            }
        });

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}