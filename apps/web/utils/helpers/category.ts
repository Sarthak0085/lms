import { db } from "@repo/db";

export const getCategoryByName = async (name: string) => {
    try {
        const user = await db.category.findUnique({
            where: {
                name
            }
        });
        return user;
    } catch (error) {
        return null
    }
}

export const getCategoryById = async (id: string) => {
    try {
        const user = await db.category.findUnique({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        return null
    }
}
