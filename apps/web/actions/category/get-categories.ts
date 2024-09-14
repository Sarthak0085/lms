"use server";

import { SearchParamsSchema } from "@/schemas";
import { db } from "@repo/db";
import { Category, Prisma, } from "@repo/db/types";
import * as z from "zod";

export const getCategories = async (input: z.infer<typeof SearchParamsSchema>) => {
    const { page, per_page, sort, name, operator, from, to } = input
    try {
        // Offset to paginate the results
        const offset = (Number(page) - 1) * Number(per_page);

        // Column and order to sort by
        // Split the sort string by "." to get the column and order
        // Example: "title.desc" => ["title", "desc"]
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
            "createdAt",
            "desc",
        ]) as [keyof Category | undefined, "asc" | "desc" | undefined]

        // Convert the date strings to Date objects
        const fromDate = from ? new Date(from) : undefined
        const toDate = to ? new Date(to) : undefined

        // Construct the filters
        const filters: Prisma.CategoryWhereInput = {
            name: name ? { contains: name } : undefined,
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
        const orderBy: Prisma.CategoryOrderByWithRelationInput = column
            ? { [column]: order }
            : { id: 'desc' }

        // Query the database
        const [data, total] = await db.$transaction([
            db.category.findMany({
                where: cleanedFilters,
                orderBy,
                skip: offset,
                take: per_page,
                include: {
                    user: true,
                }
            }),
            db.category.count({ where: cleanedFilters }),
        ]);

        const pageCount = Math.ceil(total / per_page)
        return { data, pageCount }
    } catch (err) {
        console.error(err)  // Log the error for debugging
        return { data: [], pageCount: 0 }
    }
}
