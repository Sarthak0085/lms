import { currentUser } from "@/lib/auth";
import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const { answer, questionId } = await req.json();
        const user = await currentUser();
        if (!user || !user?.id) {
            return new NextResponse("UnAuthorized. Please login to access this", { status: 401 })
        }

        const existedSection = await db.content.findUnique({
            where: {
                id: params?.sectionId,
            }
        });

        if (!existedSection) {
            return new NextResponse("Section not found", { status: 404 });
        }

        const existedQuestion = await db.question.findUnique({
            where: {
                id: questionId,
            }
        });

        if (!existedQuestion) {
            return new NextResponse("Question doesn't exists", { status: 404 });
        }

        await db.answer.create({
            data: {
                authorId: user?.id,
                questionId: questionId,
                content: answer,
            }
        });

        return NextResponse.json(
            { message: "Answer Created Successfully" },
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
        const { answer, answerId } = await req.json();
        const user = await currentUser();
        if (!user || !user?.id) {
            return new NextResponse("UnAuthorized. Please login to access this", { status: 401 })
        }
        const existedAnswer = await db.answer.findUnique({
            where: {
                id: answerId,
            }
        });

        if (!existedAnswer) {
            return new NextResponse("Answer not found", { status: 404 });
        }

        if (user?.id !== existedAnswer?.authorId) {
            return new NextResponse("Forbidden. You are not allowed to do this", { status: 403 });
        }

        await db.answer.update({
            where: {
                id: answerId
            },
            data: {
                authorId: user?.id,
                questionId: existedAnswer?.questionId,
                content: answer,
            }
        });

        return NextResponse.json(
            { message: "Answer Updated Successfully" },
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
        const { answerId } = await req.json();
        const user = await currentUser();
        if (!user || !user?.id) {
            return new NextResponse("UnAuthorized. Please login to access this", { status: 401 })
        }

        await db.answer.delete({
            where: {
                id: answerId
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