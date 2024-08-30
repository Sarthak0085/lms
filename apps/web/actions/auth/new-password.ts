"use server";

import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import { getPasswordResetTokenByToken } from "@/utils/helpers/password-reset-token";
import { ValidateNewPassword } from "@/validations";
import { getUserByEmail } from "@/utils/helpers/user";
import { db } from "@repo/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null
) => {
    if (!token) {
        return {
            error: "Missing Token",
        };
    }

    const validatedData = ValidateNewPassword(values);

    const { password } = validatedData;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) {
        return {
            error: "Invalid Token",
        };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return {
            error: "Token Expired. Please reset the password again.",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return {
            error: "Email doesn't exist",
        };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashPassword,
        },
    });

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id,
        },
    });

    return {
        success: "Password Updated Successfully!",
    };
};
