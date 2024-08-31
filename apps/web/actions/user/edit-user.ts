"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { EditUserSchema } from "@/schemas";
import { getUserById } from "@/utils/helpers/user";
import { ValidateAdminEditUser } from "@/validations";
import { db } from "@repo/db";
import { revalidatePath } from "next/cache";
import * as z from "zod";


export const editUser = async (values: z.infer<typeof EditUserSchema>) => {
    try {
        const validatedData = ValidateAdminEditUser(values);

        const { status, role, userId } = validatedData;

        const existedUser = await getUserById(userId);

        if (!existedUser) {
            throw new CustomError("User not found", 404);
        }

        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("Unauthorized. Please login to access this", 401);
        }

        if (user?.id === existedUser?.id || user?.role !== "ADMIN") {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                role: role,
                status: status,
            }
        });

        revalidatePath("/admin/users");
        revalidatePath(`/profile`);

        return {
            success: "user updated successfully"
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