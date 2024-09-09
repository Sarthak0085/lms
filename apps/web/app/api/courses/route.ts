import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    _req: NextRequest,
) => {
    try {
        const data = await db.course.findMany({});

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}