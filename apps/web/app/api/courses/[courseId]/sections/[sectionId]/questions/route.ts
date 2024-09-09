import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const { question } = await req.json();
        const user = await currentUser();
        if (!user || !user?.id) {
            throw new CustomError("UnAuthorized. Please login to access this", 401);
        }
        const existedSection = await db.content.findUnique({
            where: {
                id: params?.sectionId,
            }
        });

        if (!existedSection) {
            throw new CustomError("Section not found", 404);
        }

        await db.question.create({
            data: {
                authorId: user?.id,
                contentId: params?.sectionId,
                content: question,
            }
        });

        return NextResponse.json(
            { message: "Question Created Successfully" },
            { status: 200 }
        );

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const PUT = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const { question, questionId } = await req.json();
        const user = await currentUser();
        if (!user || !user?.id) {
            throw new CustomError("UnAuthorized. Please login to access this", 401);
        }
        const existedQuestion = await db.question.findUnique({
            where: {
                id: questionId,
            }
        });

        if (!existedQuestion) {
            throw new CustomError("Question not found", 404);
        }

        if (user?.id !== existedQuestion?.authorId) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        await db.question.update({
            where: {
                id: questionId
            },
            data: {
                authorId: user?.id,
                contentId: params?.sectionId,
                content: question,
            }
        });

        return NextResponse.json(
            { message: "Question Created Successfully" },
            { status: 200 }
        );

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const { questionId } = await req.json();
        const user = await currentUser();
        if (!user || !user?.id) {
            throw new CustomError("UnAuthorized. Please login to access this", 401);
        }

        await db.question.delete({
            where: {
                id: questionId
            }
        });

        return NextResponse.json(
            { message: "Question Deleted Successfully" },
            { status: 200 }
        );

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}