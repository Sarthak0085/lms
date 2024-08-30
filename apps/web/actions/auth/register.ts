"use server";

import CustomError from "@/lib/custom-error";
import { domain } from "@/lib/domain";
import sendEmail from "@/lib/send-mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/helpers/user";
import { ValidateRegistrationCredentials } from "@/validations";
import { db } from "@repo/db";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    try {
        const validatedData = ValidateRegistrationCredentials(values);

        const { name, email, password } = validatedData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            throw new CustomError("User already exists", 409);
        }

        //Send Verification Token Email
        const verificationToken = await generateVerificationToken(email);

        if (!verificationToken) {
            throw new CustomError("Error while generating token", 400);
        }

        const confirmLink = `${domain}/auth/verification?token=${verificationToken.token}`;

        console.log("hellobefore");

        await sendEmail({
            email: email,
            subject: "Confirm your Email",
            template: "confirmation_1.ejs",
            data: {
                name: name,
                confirmLink: confirmLink,
            }
        });

        console.log("hello");

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        if (!user) {
            throw new CustomError("Something went wrong", 400);
        }

        return { success: "Confirmation Email Sent!" };
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
