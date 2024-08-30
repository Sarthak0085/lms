import { db } from "@repo/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                email
            }
        });

        return passwordResetToken;
    } catch (error) {
        return null
    }
}

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                token
            }
        });

        return passwordResetToken;
    } catch (error) {
        return null
    }
}