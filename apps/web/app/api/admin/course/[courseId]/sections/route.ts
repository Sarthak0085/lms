import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache"

export const GET = async (
    req: NextRequest,
    { params }: { params: { courseId: string; } }
) => {
    noStore();
    try {
        const { courseId } = params;
        console.log(courseId);
        const data = await db.content.findMany({
            where: {
                courseId: courseId
            },
        });

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}