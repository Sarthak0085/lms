"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { CourseSectionSchema } from "@/schemas";
import { getSectionById } from "@/utils/helpers/section";
import { validateCreateSection } from "@/validations";
import { db } from "@repo/db";
import { UserRole } from "@repo/db/types";
import * as z from "zod";
import { getCourseById } from "../course/get-course";

export const createSection = async (values: z.infer<typeof CourseSectionSchema>) => {
    try {
        const validatedData = validateCreateSection(values);
        const { id, title, type, thumbnail, parentId, hidden, description, links, position, courseId } = validatedData;

        const user = await currentUser();

        if (!user) {
            throw new CustomError("UnAuthorized.Please login to access this fields", 401);
        }

        if (user?.role !== UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to access this field", 403);
        }

        const isCourseExists = await getCourseById(courseId);

        if (!isCourseExists) {
            throw new CustomError("Course doesn't exists", 404);
        }

        const existedSection = await getSectionById(id as string);

        if (existedSection) {
            throw new CustomError("Section already exists", 409);
        }

        if (!parentId || parentId === "") {
            console.log("started")
            const section = await db.content.create({
                data: {
                    title: title,
                    position: position,
                    type: type,
                    hidden: hidden,
                    courseId: courseId,
                }
            });

            console.log(section);

            return {
                success: "Section Created Successfully",
                section,
            }
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