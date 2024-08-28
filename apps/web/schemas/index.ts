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

export const PasswordResetSchema = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
});

export const ProfileInfoSchema = z.object({
    name: z.string().min(3, { message: "Name is Required" }),
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    image: z.string().min(2, { message: "Avatar is Required" }),
});

export const ChangePasswordSchema = z.object({
    oldPassword: z.string()
        .min(8, { message: "Old Password must contains 8 characters" }),
    newPassword: z.string()
        .min(8, { message: "New Password must contains 8 characters" }),
    confirmPassword: z.string()
        .min(8, { message: "Confirm Password must contains 8 characters" }),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});