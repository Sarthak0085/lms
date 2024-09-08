"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { CreateCategorySchema } from "@/schemas";
import { getCategoryByName } from "@/utils/helpers/category";
import { ValidateCreateCategoryInput } from "@/validations";
import { db } from "@repo/db";
import { UserRole } from "@repo/db/types";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createCategory = async (values: z.infer<typeof CreateCategorySchema>) => {
    try {
        const validatedData = ValidateCreateCategoryInput(values);

        const { name } = validatedData;

        const user = await currentUser();

        if (!user || !user?.id) {
            throw new CustomError("UnAuthorized. Please login to access this", 401);
        }

        if (user?.role !== UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to do this", 403);
        }

        const existedCategory = await getCategoryByName(name);

        if (existedCategory) {
            throw new CustomError("Category Already Exists", 409)
        }

        const category = await db.category.create({
            data: {
                name,
                userId: user?.id
            }
        });

        revalidatePath(`/courses`, "page");
        revalidatePath(`/admin/categories`, "page");

        return {
            success: "Category Created Successfully.",
            data: category
        }

    } catch (error) {
        console.log(error)
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