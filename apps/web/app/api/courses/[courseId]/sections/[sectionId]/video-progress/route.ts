import { currentUser } from "@/lib/auth";
import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod";

export const POST = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const { currentTimestamp } = await req.json();
        const user = await currentUser();
        if (!user || !user?.id) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (!Number(currentTimestamp)) {
            return new NextResponse("Current timestamp is not valid", { status: 400 });
        }

        await db.videoProgress.upsert({
            where: {
                contentId_userId: {
                    contentId: params.sectionId,
                    userId: user?.id
                }
            },
            update: { currentTimestamp },
            create: {
                userId: user?.id,
                contentId: params.sectionId,
                currentTimestamp
            }
        });

        return new NextResponse("Progress updated", { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}

export const GET = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const user = await currentUser();
        if (!user || !user?.id) {
            return new NextResponse("User not found", { status: 404 });
        }
        // Upsert progress (update if exists, create if not)
        const progress = await db.videoProgress.findUnique({
            where: {
                contentId_userId: {
                    contentId: params.sectionId,
                    userId: user?.id
                }
            },
        });

        return NextResponse.json(progress || { currentTimestamp: 0 }, { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}