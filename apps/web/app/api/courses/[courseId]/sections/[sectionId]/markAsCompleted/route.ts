import { currentUser } from "@/lib/auth";
import { db } from "@repo/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const user = await currentUser();
        if (!user || !user?.id) {
            return new NextResponse("UnAuthorized. Please login to access this", { status: 401 })
        }
        const markAsCompleted = await db.markAsCompleted.findUnique({
            where: {
                userId_contentId: {
                    userId: user?.id,
                    contentId: params?.sectionId
                }
            }
        });

        if (!markAsCompleted) {
            await db.markAsCompleted.create({
                data: {
                    userId: user?.id,
                    contentId: params.sectionId,
                    markAsCopleted: true,
                }
            });
        }

        revalidatePath(`/course/${params.courseId}/sections/${params.sectionId}`, "page");
        revalidatePath(`/course/${params.courseId}/sections`, "page");
        revalidatePath(`/course/${params.courseId}/sections`, "layout");

        return NextResponse.json(
            { message: "Mark As Completed toggle Successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const PUT = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const user = await currentUser();
        if (!user || !user?.id) {
            return new NextResponse("UnAuthorized. Please login to access this", { status: 401 })
        }
        const markAsCompleted = await db.markAsCompleted.findUnique({
            where: {
                userId_contentId: {
                    userId: user?.id,
                    contentId: params?.sectionId
                }
            }
        });

        if (markAsCompleted) {
            if (user?.id !== markAsCompleted?.userId) {
                return new NextResponse("Forbidden. You are not allowed to do this", { status: 403 });
            }

            await db.markAsCompleted.delete({
                where: {
                    userId_contentId: {
                        userId: user?.id,
                        contentId: params.sectionId,
                    }
                }
            });
        } else {
            await db.markAsCompleted.create({
                data: {
                    userId: user?.id,
                    contentId: params.sectionId,
                    markAsCopleted: true,
                }
            });
        }

        revalidatePath(`/course/${params.courseId}/sections/${params.sectionId}`, "page");
        revalidatePath(`/course/${params.courseId}/sections`, "page");
        revalidatePath(`/course/${params.courseId}/sections`, "layout");

        return NextResponse.json(
            { message: "Mark As Completed toggle Successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}