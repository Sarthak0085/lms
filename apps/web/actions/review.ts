"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { createReviewSchema } from "@/schemas";
import { validateCreateReview } from "@/validations";
import { db } from "@repo/db";
import { z } from "zod";

export const createReview = async (values: z.infer<typeof createReviewSchema>) => {
    try {

        const validatedData = validateCreateReview(values);

        const { content, courseId, rating } = validatedData;

        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this", 401);
        }

        const isReviewExists = await db.review.findUnique({
            where: {
                userId_courseId: {
                    userId: user?.id,
                    courseId: courseId,
                }
            }
        });

        if (isReviewExists) {
            throw new CustomError("Review Already Exists", 401);
        }

        await db.review.create({
            data: {
                content: content,
                rating: rating,
                courseId: courseId,
                userId: user?.id,
            }
        });

        return {
            success: "Course Review successfully"
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