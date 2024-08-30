"use server";

import CustomError from "@/lib/custom-error";
import { domain } from "@/lib/domain";
import sendEmail from "@/lib/send-mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { PasswordResetSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/helpers/user";
import { ValidateResetPassword } from "@/validations";
import * as z from "zod";

export const passwordReset = async (values: z.infer<typeof PasswordResetSchema>) => {
    try {
        const validatedData = ValidateResetPassword(values);

        const { email } = validatedData;

        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
            throw new CustomError("User doesn't exist", 404);
        }

        const passwordResetToken = await generatePasswordResetToken(email);

        if (!passwordResetToken) {
            throw new CustomError("Error while generating token", 400);
        }

        const confirmLink = `${domain}/auth/new-password?token=${passwordResetToken.token}`;

        await sendEmail({
            email: email,
            subject: "Reset your Password",
            template: "reset-password.ejs",
            data: {
                name: existingUser?.name,
                confirmLink: confirmLink,
            }
        });

        return {
            success: "Reset Email Sent!",
        };
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            code: 500,
        };
    }
};
