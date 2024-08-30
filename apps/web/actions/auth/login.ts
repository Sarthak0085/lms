"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { ValidateLoginCredentials } from "@/validations";
import { getUserByEmail } from "@/utils/helpers/user";
import CustomError from "@/lib/custom-error";
import { UserStatus } from "@repo/db/types";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import sendEmail from "@/lib/send-mail";
import { getTwoFactorTokenByEmail } from "@/utils/helpers/two-factor-token";
import { db } from "@repo/db";
import { getTwoFactorConfirmationByUserId } from "@/utils/helpers/two-factor-confirmation";
import { domain } from "@/lib/domain";

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
) => {
    const validatedData = ValidateLoginCredentials(values);

    const { email, password, code } = validatedData;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser?.email || !existingUser?.password) {
        throw new CustomError("User doesn't exist", 404);
    }

    if (existingUser?.status === UserStatus.BLOCK) {
        throw new CustomError("Your account have been blocked. Please contact us to know the reason.", 403);
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch) {
        throw new CustomError("Invalid Credentials", 400);
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(
            existingUser.email
        );

        const confirmLink = `${domain}/auth/verification?token=${verificationToken.token}`;

        await sendEmail({
            email: email,
            subject: "Confirm your Email",
            template: "confirmation.ejs",
            data: {
                name: existingUser?.name,
                confirmLink: confirmLink,
            }
        });

        return {
            success: "Confirmation Email Sent!",
        };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

            if (!twoFactorToken) {
                throw new CustomError("Invalid Code", 400)
            }

            if (twoFactorToken.token.toString() !== code.toString()) {
                throw new CustomError("Invalid Code", 400)
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                throw new CustomError("Code expired", 401)
            }

            await db.twoFactorToken.delete({
                where: {
                    id: twoFactorToken.id,
                },
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id,
                    },
                });
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                },
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email);

            await sendEmail({
                email: twoFactorToken.email,
                subject: "Two Factor Authentication Code",
                template: "two-factor-auth.ejs",
                data: {
                    name: existingUser?.name,
                    token: twoFactorToken?.token,
                }
            });

            return {
                twoFactor: true,
            };
        }
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirect: callbackUrl ? true : false,
            redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
        });

        return {
            success: "Logged In Successfully."
        }

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error?.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Credentials",
                        code: 409
                    };
                default:
                    return {
                        error: "An unexpected error occurred.",
                        code: 500,
                    };
            }
        }
    }
};
