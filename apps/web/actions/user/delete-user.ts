"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { db } from "@repo/db"
import { UserRole } from "@repo/db/types";
import { revalidatePath } from "next/cache"

export const deleteUsers = async (input: { ids: string[] }) => {
    try {
        const user = await currentUser();

        if (!currentUser) {
            throw new CustomError("Please login to access this", 401);
        }

        if (user?.role !== UserRole.ADMIN && user?.email !== "sarth.mahajan2000@gmail.com") {
            throw new CustomError("Forbidden! You are not allowed to do this", 403);
        }

        // await db.user.deleteMany({
        //     where: {
        //         id: {
        //             in: input.ids,
        //         }
        //     }
        // });

        revalidatePath("/admin/users");
        revalidatePath("/profile");

        return {
            success: input.ids.length === 1 ? "Users deleted successfully" : "User deleted successfully"
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