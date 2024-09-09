"use server";

import CustomError from "@/lib/custom-error";
import { SearchParamsSchema } from "@/schemas";
import { db } from "@repo/db";
import { Course, Prisma } from "@repo/db/types";
import { z } from "zod";

export const getCourses = async (input: z.infer<typeof SearchParamsSchema>) => {
    const { page, per_page, sort, title, price, purchased, status, level, slug, category, operator, from, to } = input
    try {
        // Offset to paginate the results
        const offset = (Number(page) - 1) * Number(per_page);

        // Column and order to sort by
        // Split the sort string by "." to get the column and order
        // Example: "title.desc" => ["title", "desc"]
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
            "createdAt",
            "desc",
        ]) as [keyof Course | undefined, "asc" | "desc" | undefined]

        // const statuses = status?.split(".") as UserStatus[];

        // Convert the date strings to Date objects
        const fromDate = from ? new Date(from) : undefined
        const toDate = to ? new Date(to) : undefined

        // Construct the filters
        const filters: Prisma.CourseWhereInput = {
            title: title ? { contains: title } : undefined,
            slug: slug ? { contains: slug } : undefined,
            price: price ? { contains: price } : undefined,
            purchased: purchased ? { contains: purchased } : undefined,
            category: category ? { contains: category } : undefined,
            status: status ? { in: status as any } : undefined,
            level: level ? { in: level } : undefined,
            createdAt: {
                ...(fromDate && { gte: fromDate }),
                ...(toDate && { lte: toDate }),
            },
        }

        // Remove undefined values from the filters
        const cleanedFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== undefined)
        )

        // Build the orderBy object
        const orderBy: Prisma.CourseOrderByWithRelationInput = column
            ? { [column]: order }
            : { id: 'desc' }

        // Query the database
        const [data, total] = await db.$transaction([
            db.course.findMany({
                where: cleanedFilters,
                orderBy,
                skip: offset,
                take: per_page,
            }),
            db.course.count({ where: cleanedFilters }),
        ]);

        const pageCount = Math.ceil(total / per_page)
        return { data, pageCount }
    } catch (err) {
        console.error(err)  // Log the error for debugging
        return { data: [], pageCount: 0 }
    }
}

export const getCourseById = async (id: string) => {
    try {
        const data = await db.course.findUnique({
            where: {
                id
            },
            include: {
                benefits: true,
                prerequisites: true,
            }
        });

        return {
            data
        }
    } catch (error) {
        // if (error instanceof CustomError) {
        //     return {
        //         error: error.message,
        //         code: error.code,
        //     };
        // }
        // return {
        //     error: "An unexpected error occurred.",
        //     code: 500,
        // };
        return {
            data: null
        }
    }
}

export const getCourseContents = async (id: string) => {
    try {
        const data = await db.course.findUnique({
            where: {
                id
            },
            include: {
                content: {
                    include: {
                        children: true,
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                },
            },
        });

        return {
            data
        }
    } catch (error) {
        return {
            data: null
        }
    }
}



