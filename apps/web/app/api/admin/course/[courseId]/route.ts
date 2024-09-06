import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { courseId: string; } }
) => {
    try {
        const { courseId } = params;
        const data = await db.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                benefits: true,
                prerequisites: true
            }
        });

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}