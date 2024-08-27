import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" }),
    code: z.optional(z.string().min(6, { message: "Code must have 6 digits" }))
});

export const RegisterSchema = z.object({
    name: z.string().min(3, { message: "Name is Required" }),
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" }),
});

export const PasswordResetForm = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
});