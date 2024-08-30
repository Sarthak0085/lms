import { db } from "@repo/db";

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: {
                email
            }
        });

        return twoFactorToken;
    } catch (error) {
        return null
    }
}

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: {
                token
            }
        });

        return twoFactorToken;
    } catch (error) {
        return null
    }
}