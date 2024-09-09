"use server";

import { db } from "@repo/db";
import { unstable_noStore as noStore } from "next/cache";

export const getQuestionsByContentId = async (contentId: string) => {
    noStore();
    try {
        const data = await db.question.findMany({
            where: {
                contentId: contentId,
            },
            include: {
                author: true,
                answers: true
            }
        });

        return {
            data
        }
    } catch (error) {
        return {
            error: "An unexpected error occurred.",
            data: [],
            code: 500,
        };
    }
}