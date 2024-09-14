"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { db } from "@repo/db"
import { UserRole } from "@repo/db/types";
import { revalidatePath } from "next/cache"

export const deleteReviews = async (input: { ids: string[] }) => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new CustomError("Please login to access this", 401);
        }

        if (user?.role !== UserRole.ADMIN && user?.email !== "sarth.mahajan2000@gmail.com") {
            throw new CustomError("Forbidden! You are not allowed to do this", 403);
        }

        await db.review.deleteMany({
            where: {
                id: {
                    in: input.ids,
                },
            }
        });

        revalidatePath("/admin/reviews", "page");

        return {
            success: input.ids.length === 1 ? "Reviews deleted successfully" : "Review deleted successfully"
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
            code: 500,
        };
    }
}