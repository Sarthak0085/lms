"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { db } from "@repo/db"
import { UserRole } from "@repo/db/types";
import { revalidatePath, unstable_noStore } from "next/cache"

export const deleteCategories = async (input: { ids: string[] }) => {
    unstable_noStore();
    try {
        const user = await currentUser();

        if (!currentUser) {
            throw new CustomError("Please login to access this", 401);
        }

        if (user?.role !== UserRole.ADMIN && user?.email !== "sarth.mahajan2000@gmail.com") {
            throw new CustomError("Forbidden! You are not allowed to do this", 403);
        }

        await db.category.deleteMany({
            where: {
                id: {
                    in: input.ids,
                }
            }
        });

        revalidatePath("/admin/categories", "page");
        revalidatePath("/courses", "page");

        return {
            success: input.ids.length === 1 ? "Categories deleted successfully" : "Category deleted successfully"
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