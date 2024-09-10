"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { db } from "@repo/db";
import { VoteType } from "@repo/db/types";

export const updateVote = async (voteType: VoteType, questionId?: string, answerId?: string) => {
    try {
        const user = await currentUser();
        if (!user || !user?.id) {
            throw new CustomError("UnAuthorized. Please login to access this", 401);
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

            console.log(isVoteExists);

            if (isVoteExists) {
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
                        answerId: answerId!,
                        userId: user?.id
                    },
                    voteType: voteType,
                }
            });

            if (isVoteExists) {
                await db.vote.delete({
                    where: {
                        answerId_userId: {
                            answerId: answerId!,
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
    } catch (error) {
        console.error(error)
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            code: 500,
        };
    }
}