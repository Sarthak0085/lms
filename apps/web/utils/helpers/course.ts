import { db } from "@repo/db";

export const getCourseBySlug = async (slug: string) => {
    try {
        const user = await db.course.findUnique({
            where: {
                slug
            }
        });
        return user;
    } catch (error) {
        return null
    }
}

export const getCourseById = async (id: string) => {
    try {
        const user = await db.course.findUnique({
            where: {
                id
            }
        });

        return user;
    } catch (error) {
        return null
    }
}