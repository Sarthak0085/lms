import { currentUser } from "@/lib/auth";
import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
    req: NextRequest,
    { params }: { params: { courseId: string; sectionId: string } }
) => {
    try {
        const { questionId, voteType, answerId } = await req.json();
        const user = await currentUser();
        if (!user || !user?.id) {
            return new NextResponse("UnAuthorized. Please login to access this", { status: 401 });
        }

        if (questionId && questionId !== "") {
            const isVoteExists = await db.vote.findUnique({
                where: {
                    questionId_userId: {
                        questionId: questionId,
                        userId: user?.id
                    },
                    voteType: voteType,
                }
            });

            if (!isVoteExists) {
                await db.vote.delete({
                    where: {
                        questionId_userId: {
                            questionId: questionId,
                            userId: user?.id
                        },
                        voteType: voteType,
                    }
                })
            } else {
                await db.vote.create({
                    data: {
                        questionId: questionId,
                        userId: user?.id,
                        voteType: voteType,
                    }
                });
            }
        } else {
            const isVoteExists = await db.vote.findUnique({
                where: {
                    answerId_userId: {
                        answerId: answerId,
                        userId: user?.id
                    },
                    voteType: voteType,
                }
            });

            if (!isVoteExists) {
                await db.vote.delete({
                    where: {
                        answerId_userId: {
                            answerId: answerId,
                            userId: user?.id
                        },
                        voteType: voteType,
                    }
                })
            } else {
                await db.vote.create({
                    data: {
                        answerId: answerId,
                        userId: user?.id,
                        voteType: voteType,
                    }
                });
            }
        }

        return NextResponse.json(
            { message: "Vote Submitted Successfully" },
            { status: 200 }
        );

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}