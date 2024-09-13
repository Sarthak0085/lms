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
                content: true,
            }
        });

        if (data) {
            const sortedContent = data.content
                .filter((con) => con.hidden === false)
                .sort((a, b) => a.position - b.position);

            data.content = sortedContent;
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Internal Server Error ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}