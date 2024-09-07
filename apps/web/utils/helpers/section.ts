import { db } from "@repo/db";

export const getSectionById = async (id: string) => {
    try {
        const content = await db.content.findUnique({
            where: {
                id
            }
        });

        return content;
    } catch (error) {
        return null
    }
}