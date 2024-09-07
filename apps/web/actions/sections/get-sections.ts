"use server";

import CustomError from "@/lib/custom-error";
import { db } from "@repo/db";
import { unstable_noStore as noStore } from "next/cache";

export const getSections = async (courseId: string) => {
    noStore();
    try {
        const data = await db.content.findMany({
            where: {
                courseId: courseId,
            }
        });

        return {
            data
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            data: [],
            code: 500,
        };
    }
}