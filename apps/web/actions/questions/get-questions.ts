"use server";

import { SearchParamsSchema } from "@/schemas";
import { db } from "@repo/db";
import { Prisma, Question } from "@repo/db/types";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";


export const getQuestions = async (input: z.infer<typeof SearchParamsSchema>) => {
    const { page, per_page, sort, content, operator, from, to } = input
    try {
        // Offset to paginate the results
        const offset = (Number(page) - 1) * Number(per_page);

        // Column and order to sort by
        // Split the sort string by "." to get the column and order
        // Example: "title.desc" => ["title", "desc"]
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
            "createdAt",
            "desc",
        ]) as [keyof Question | undefined, "asc" | "desc" | undefined]

        // Convert the date strings to Date objects
        const fromDate = from ? new Date(from) : undefined
        const toDate = to ? new Date(to) : undefined

        // Construct the filters
        const filters: Prisma.QuestionWhereInput = {
            content: content ? { contains: content } : undefined,
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
        const orderBy: Prisma.QuestionOrderByWithRelationInput = column
            ? { [column]: order }
            : { id: 'desc' }

        // Query the database
        const [data, total] = await db.$transaction([
            db.question.findMany({
                where: cleanedFilters,
                orderBy,
                skip: offset,
                take: per_page,
                include: {
                    author: true,
                    onContent: true,
                }
            }),
            db.question.count({ where: cleanedFilters }),
        ]);

        const pageCount = Math.ceil(total / per_page)
        return { data, pageCount }
    } catch (err) {
        console.error(err)  // Log the error for debugging
        return { data: [], pageCount: 0 }
    }
}

export const getQuestionsByContentId = async (contentId: string) => {
    noStore();
    try {
        const data = await db.question.findMany({
            where: {
                contentId: contentId,
            },
            include: {
                author: true,
                answers: {
                    include: {
                        votes: true,
                        author: true,
                    }
                },
                votes: true,
            },
            orderBy: {
                createdAt: "desc",
            }
        });

        return {
            data
        }
    } catch (error) {
        return {
            error: "An unexpected error occurred.",
            data: [],
            code: 500,
        };
    }
}