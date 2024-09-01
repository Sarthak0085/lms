"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { UpdateCategorySchema } from "@/schemas";
import { getCategoryById } from "@/utils/helpers/category";
import { ValidateUpdateCategoryInput } from "@/validations";
import { db } from "@repo/db";
import { UserRole } from "@repo/db/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const editCategory = async (values: z.infer<typeof UpdateCategorySchema>) => {
    try {
        const validatedData = ValidateUpdateCategoryInput(values);

        const { userId, name, categoryId } = validatedData;

        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("Unauthorized. Please login first", 401);
        }

        if (user?.id !== userId || user?.role !== UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        const existedCategory = await getCategoryById(name);

        if (existedCategory && existedCategory?.id !== categoryId) {
            throw new CustomError("Category Already Exists", 409);
        }

        const category = await db.category.update({
            where: {
                id: categoryId
            },
            data: {
                name: name,
                userId: userId,
            }
        });

        revalidatePath(`/courses`, "page");
        revalidatePath(`/admin/categories`, "page");

        return {
            success: "Category updated successfully.",
            data: category
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
