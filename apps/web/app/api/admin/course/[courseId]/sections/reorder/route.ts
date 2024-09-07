import { currentUser } from "@/lib/auth";
import { db } from "@repo/db";
import { UserRole } from "@repo/db/types";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
    req: NextRequest,
    { params }: { params: { courseId: string } }
) => {
    try {
        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized. Please login to access this.", { status: 401 });
        }

        if (user?.role !== UserRole.ADMIN) {
            return new NextResponse("Forbidden. You are not allowed to access this.", { status: 403 });
        }

        const { list } = await req.json();

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
            },
        });

        if (!course) {
            return new NextResponse("Course not found", { status: 404 });
        }

        for (let item of list) {
            await db.content.update({
                where: {
                    id: item.id,
                },
                data: {
                    position: item.position,
                },
            });
        }

        return new NextResponse("Reorder sections successfully", { status: 200 });
    } catch (err) {
        console.log("[reorder_PUT]", err);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};