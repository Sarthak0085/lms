"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { db } from "@repo/db"
import { UserRole } from "@repo/db/types";
import { revalidatePath, unstable_noStore } from "next/cache"

export const deleteQuestions = async (input: { ids: string[] }) => {
    unstable_noStore();
    try {
        const user = await currentUser();

        if (!user) {
            throw new CustomError("Please login to access this", 401);
        }

        if (user?.role !== UserRole.ADMIN && user?.email !== "sarth.mahajan2000@gmail.com") {
            throw new CustomError("Forbidden! You are not allowed to do this", 403);
        }

        await db.question.deleteMany({
            where: {
                id: {
                    in: input.ids,
                },
            }
        });

        revalidatePath("/admin/questions", "page");

        return {
            success: input.ids.length === 1 ? "Questions deleted successfully" : "Question deleted successfully"
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