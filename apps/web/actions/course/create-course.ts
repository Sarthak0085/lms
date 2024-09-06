"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { CreateCourseSchema } from "@/schemas";
import { getCourseBySlug } from "@/utils/helpers/course";
import { validateCreateCourse } from "@/validations";
import { db } from "@repo/db";
import { UserRole } from "@repo/db/types";
import * as z from "zod";

export const createCourse = async (values: z.infer<typeof CreateCourseSchema>) => {
    try {
        const validatedData = validateCreateCourse(values);
        const { course: { name, description, price, estimatedPrice, slug, demoUrl, thumbnail, category, tags, level }, prerequisites, benefits } = validatedData;
        const user = await currentUser();
        if (!user) {
            throw new CustomError("UnAuthorized. Please login to access this!!", 401);
        }

        if (user?.role !== UserRole.ADMIN) {
            throw new CustomError("Foridden. You are not allowed to access this!!", 403);
        }

        const existedCourse = await getCourseBySlug(slug);
        if (existedCourse) {
            throw new CustomError("Course already exist withgiven slug. Please change name and slug", 409);
        }

        const newCourse = await db.course.create({
            data: {
                name: name,
                slug: slug,
                description: description,
                price: Number(price),
                estimatedPrice: Number(estimatedPrice),
                demoUrl: demoUrl,
                level: level,
                category: category,
                tags: tags,
                thumbnail: thumbnail
            }
        });

        if (benefits && benefits.length > 0) {
            await db.benefit.createMany({
                data: benefits.map(benefit => ({
                    courseId: newCourse.id,
                    title: benefit.title,
                }))
            });
        }

        if (prerequisites && prerequisites.length > 0) {
            await db.prerequisite.createMany({
                data: prerequisites.map(prerequisite => ({
                    courseId: newCourse.id,
                    title: prerequisite.title,
                }))
            });
        }

        return {
            success: "Course Created Successfully!!",
            data: {
                id: newCourse?.id
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