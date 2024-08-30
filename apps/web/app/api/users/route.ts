import { SearchParamsSchema } from '@/schemas'
import { db } from '@repo/db'
import { Prisma, User } from '@repo/db/types'
import { NextResponse } from 'next/server'

// Define the API handler
export async function GET(request: Request) {
    const url = new URL(request.url)
    const query = Object.fromEntries(url.searchParams.entries())

    // Validate and parse query parameters
    const validatedQuery = SearchParamsSchema.safeParse(query)
    if (!validatedQuery.success) {
        return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 })
    }
    // const validatedQuery = ValidateSearchParams(query);

    const { page, per_page, sort, title, status, priority, operator, from, to } = validatedQuery.data

    try {
        // Offset for pagination
        const offset = (page - 1) * per_page

        // Split column and order for sorting
        const [column, order] = (sort?.split(".").filter(Boolean) ?? ["createdAt", "desc"]) as [keyof User | undefined, "asc" | "desc" | undefined]

        // Convert date strings to Date objects
        const fromDate = from ? new Date(from) : undefined
        const toDate = to ? new Date(to) : undefined

        // Build the where conditions
        const whereConditions: Prisma.UserWhereInput = {
            AND: [
                title ? { title: { contains: title, mode: 'insensitive' } } : undefined,
                status ? { status } : undefined,
                priority ? { priority } : undefined,
                fromDate && toDate ? { createdAt: { gte: fromDate, lte: toDate } } : undefined
            ].filter(Boolean) as Prisma.UserWhereInput
        }

        // Fetch tasks with pagination and sorting
        const data = await db.user.findMany({
            take: per_page,
            skip: offset,
            where: whereConditions,
            orderBy: column && order ? { [column]: order } : { createdAt: 'desc' }
        })

        // Count the total number of tasks that match the conditions
        const total = await db.user.count({
            where: whereConditions
        })

        // Calculate page count
        const pageCount = Math.ceil(total / per_page)

        // Return response
        return NextResponse.json({ data, pageCount })
    } catch (err) {
        console.error('Error fetching tasks:', err)
        return NextResponse.json({ data: [], pageCount: 0 }, { status: 500 })
    }
}
