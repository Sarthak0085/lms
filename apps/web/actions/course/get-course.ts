"use server";

import CustomError from "@/lib/custom-error";
import { db } from "@repo/db";

export const getCourseById = async (id: string) => {
    try {
        const data = await db.course.findUnique({
            where: {
                id
            },
            include: {
                benefits: true,
                prerequisites: true,
            }
        });

        return {
            data
        }
    } catch (error) {
        // if (error instanceof CustomError) {
        //     return {
        //         error: error.message,
        //         code: error.code,
        //     };
        // }
        // return {
        //     error: "An unexpected error occurred.",
        //     code: 500,
        // };
        return {
            data: null
        }
    }
}