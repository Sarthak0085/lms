"use server";

import { SearchParamsSchema } from "@/schemas";
import { db } from "@repo/db";
import { Prisma, User, UserStatus } from "@repo/db/types";
import * as z from "zod";

export const getUsers = async (input: z.infer<typeof SearchParamsSchema>) => {
    const { page, per_page, sort, name, status, role, email, operator, from, to } = input
    console.log("input", input);
    try {
        // Offset to paginate the results
        const offset = (Number(page) - 1) * Number(per_page);

        // Column and order to sort by
        // Split the sort string by "." to get the column and order
        // Example: "title.desc" => ["title", "desc"]
        const [column, order] = (sort?.split(".").filter(Boolean) ?? [
            "createdAt",
            "desc",
        ]) as [keyof User | undefined, "asc" | "desc" | undefined]

        // const statuses = status?.split(".") as UserStatus[];

        // Convert the date strings to Date objects
        const fromDate = from ? new Date(from) : undefined
        const toDate = to ? new Date(to) : undefined

        // Construct the filters
        const filters: Prisma.UserWhereInput = {
            name: name ? { contains: name } : undefined,
            email: email ? { contains: email } : undefined,
            status: status ? { in: status } : undefined,
            role: role ? { in: role } : undefined,
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
        const orderBy: Prisma.UserOrderByWithRelationInput = column
            ? { [column]: order }
            : { id: 'desc' }

        // Query the database
        const [data, total] = await db.$transaction([
            db.user.findMany({
                where: cleanedFilters,
                orderBy,
                skip: offset,
                take: per_page,
            }),
            db.user.count({ where: cleanedFilters }),
        ]);

        const pageCount = Math.ceil(total / per_page)
        return { data, pageCount }
    } catch (err) {
        console.error(err)  // Log the error for debugging
        return { data: [], pageCount: 0 }
    }
}
